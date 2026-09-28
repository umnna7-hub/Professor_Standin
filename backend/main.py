
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import requests
import re

app = FastAPI(title="Professor Stand-In API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATASET_PATH = Path(__file__).parent / "dataset.txt"
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3.2"


class Question(BaseModel):
    question: str


def find_relevant_sections(question: str, dataset: str, limit: int = 5):
    words = {
        w.lower()
        for w in re.findall(r"[A-Za-z0-9]+", question)
        if len(w) > 2
    }

    sections = re.split(r"(?=### \d+\.)", dataset)
    scored = []

    for section in sections:
        if not section.strip():
            continue
        score = sum(1 for word in words if word in section.lower())
        if score:
            scored.append((score, section.strip()))

    scored.sort(key=lambda x: x[0], reverse=True)
    return [section for _, section in scored[:limit]]


@app.get("/")
def home():
    return {"message": "Professor Stand-In API is running"}


@app.post("/ask")
def ask_question(data: Question):
    dataset = DATASET_PATH.read_text(encoding="utf-8")
    sections = find_relevant_sections(data.question, dataset)

    if not sections:
        return {
            "answer": (
                "I don't have enough approved information in the professor's "
                "knowledge base to answer that reliably. Please contact "
                "Dr. Ahmed directly if the question requires his personal judgment."
            ),
            "escalation": True,
            "sources": [],
        }

    context = "\n\n---\n\n".join(sections)

    prompt = f"""
You are the AI Stand-In for Dr. Ahmed, a university professor who teaches
Object-Oriented Programming (OOP) / Java.

You are NOT Dr. Ahmed. You are an AI representation of his approved knowledge.

Use the approved dataset excerpts below as your primary source.

Rules:
1. Do not invent facts about Dr. Ahmed.
2. Do not claim that Dr. Ahmed personally wrote or said your generated response.
3. If the retrieved material says a request must be escalated or refused,
   follow that boundary.
4. Do not independently change grades, approve extensions, grant exceptions,
   regrade exams, provide active exam answers, complete assessed assignments,
   facilitate plagiarism, disclose another student's information, or make
   personal decisions for the professor.
5. For those cases, tell the user that the matter requires Dr. Ahmed or the
   official university process.
6. Answer educational questions clearly.
7. Stay within the professor's subject and approved information.

APPROVED DATASET EXCERPTS:
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
            "escalation": "🚨 ESCALATE" in context,
            "sources": [s.splitlines()[0] for s in sections],
        }

    except requests.exceptions.ConnectionError:
        return {
            "answer": (
                "FastAPI is running, but Ollama is not reachable. "
                "Start Ollama and make sure llama3.2 is installed."
            ),
            "escalation": False,
            "sources": [],
        }
    except Exception as exc:
        return {"answer": f"AI request failed: {exc}", "escalation": False, "sources": []}
