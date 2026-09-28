# Professor Stand-In — One-Day POC

Uses the provided virtual interview dataset for Dr. Ahmed, OOP / Java.

## Start backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

## Start Ollama

```powershell
ollama pull llama3.2
```

Make sure Ollama is running.

## Start frontend

Open another PowerShell:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally http://localhost:5173

## Test questions

- What is the difference between an abstract class and an interface in Java?
- How should I debug a Java program that isn't working?
- I'm struggling to understand OOP. What would you recommend?
- I'm at 89%. Can you round my grade up to an A?
- Write the complete Java code for Question 3 of my assignment.

The last two demonstrate escalation/academic-integrity boundaries.

This is a first POC. ChromaDB/RAG, Whisper, Piper TTS and more advanced
escalation logic can be added after the basic pipeline works.
