from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from pathlib import Path
import json
import re
import requests

app = FastAPI(title="Professor Stand-In API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).parent
FRONTEND_DIR = BASE_DIR / "frontend"
DATASET_PATH = BASE_DIR / "dataset.json"

if FRONTEND_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR)), name="static")

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3.2"


class Question(BaseModel):
    question: str


def load_dataset():
    return json.loads(DATASET_PATH.read_text(encoding="utf-8"))


def tokenize(value: str):
    return {
        word.lower()
        for word in re.findall(r"[A-Za-z0-9]+", value)
        if len(word) > 2
    }


def find_relevant_records(question: str, records, limit: int = 5):
    query_words = tokenize(question)
    scored = []

    for record in records:
        searchable = " ".join([
            record["student_question"],
            record["professor_response"],
            record["category"],
            record["status"],
        ])
        words = tokenize(searchable)
        score = len(query_words & words)

        # Give the student's original interview question extra weight.
        question_words = tokenize(record["student_question"])
        score += 2 * len(query_words & question_words)

        if score:
            scored.append((score, record))

    scored.sort(key=lambda item: item[0], reverse=True)
    return [record for _, record in scored[:limit]]


@app.get("/")
def home(request: Request):
    accept = request.headers.get("accept", "")
    if "text/html" in accept and (FRONTEND_DIR / "index.html").exists():
        return FileResponse(FRONTEND_DIR / "index.html")
    return {
        "message": "Professor Stand-In API is running",
        "data_source": "Sir Muhammad Saleem interview dataset",
        "records": len(load_dataset()["records"]),
    }


@app.get("/api/status")
def api_status():
    return {
        "message": "Professor Stand-In API is running",
        "data_source": "Sir Muhammad Saleem interview dataset",
        "records": len(load_dataset()["records"]),
    }


@app.get("/api/records")
def api_records():
    return load_dataset()


@app.get("/style.css")
def get_css():
    return FileResponse(FRONTEND_DIR / "style.css", media_type="text/css")


@app.get("/dataset.js")
def get_dataset_js():
    return FileResponse(FRONTEND_DIR / "dataset.js", media_type="application/javascript")


@app.get("/app.js")
def get_app_js():
    return FileResponse(FRONTEND_DIR / "app.js", media_type="application/javascript")



@app.post("/ask")
def ask_question(data: Question):
    dataset = load_dataset()
    records = dataset["records"]
    relevant = find_relevant_records(data.question, records)

    if not relevant:
        return {
            "answer": (
                "I don't have enough approved information in Sir Muhammad Saleem's "
                "knowledge base to answer that reliably. Please contact "
                "Sir Muhammad Saleem directly if the question requires his personal judgment."
            ),
            "escalation": True,
            "sources": [],
        }

    context_parts = []
    # Primary escalation status is determined by the top relevant matching entry
    escalation = relevant[0]["escalation_required"] if relevant else False

    for record in relevant:
        context_parts.append(
            f"Interview entry {record['id']} — {record['category']}\n"
            f"Student: {record['student_question']}\n"
            f"Sir Muhammad Saleem: {record['professor_response']}\n"
            f"Status: {record['status']}"
        )

    context = "\n\n---\n\n".join(context_parts)

    prompt = f"""
You are the AI Stand-In for Sir Muhammad Saleem, a university professor who teaches
Object-Oriented Programming (OOP) / Java.

You are NOT Sir Muhammad Saleem. You are an AI representation of his approved knowledge.

Use the supplied interview dataset as your primary and authoritative source.

Rules:
1. Do not invent facts about Sir Muhammad Saleem.
2. Do not claim that Sir Muhammad Saleem personally wrote or said your generated response.
3. Preserve the boundaries in the supplied Status field.
4. If an entry is marked ESCALATE or REFUSE, do not override that boundary.
5. Do not independently change grades, approve extensions, grant exceptions,
   regrade exams, provide active exam answers, complete assessed assignments,
   facilitate plagiarism, disclose another student's information, or make
   personal decisions for the professor.
6. For those cases, explain that the matter requires Sir Muhammad Saleem or the official
   university process.
7. For educational questions, explain using the knowledge supported by the
   retrieved interview entries.
8. If the dataset does not contain enough information, say so rather than
   filling the gap with invented details.

APPROVED INTERVIEW DATA:
{context}

STUDENT QUESTION:
{data.question}
"""

    try:
        response = requests.post(
            OLLAMA_URL,
            json={"model": MODEL, "prompt": prompt, "stream": False},
            timeout=120,
        )
        response.raise_for_status()
        result = response.json()

        return {
            "answer": result.get("response", "No response was returned."),
            "escalation": escalation,
            "sources": [
                f"Interview entry {record['id']}: {record['student_question']}"
                for record in relevant
            ],
        }

    except requests.exceptions.ConnectionError:
        # Fallback to direct authentic answer from Sir Muhammad Saleem's approved dataset
        top_record = relevant[0]
        return {
            "answer": top_record["professor_response"],
            "escalation": escalation,
            "sources": [
                f"Interview entry {record['id']}: {record['student_question']}"
                for record in relevant
            ],
            "fallback_notice": "Served directly from Sir Muhammad Saleem's verified knowledge base (Ollama offline).",
        }
    except Exception as exc:
        return {
            "answer": f"AI request failed: {exc}",
            "escalation": escalation,
            "sources": [],
        }
