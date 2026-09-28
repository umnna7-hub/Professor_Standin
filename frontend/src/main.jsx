import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);

  async function askStandIn() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    setSources([]);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({question}),
      });
      const data = await response.json();
      setAnswer(data.answer);
      setSources(data.sources || []);
    } catch {
      setAnswer("Could not connect to FastAPI. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <div className="badge">ROCKETATHON POC</div>
        <h1>Professor Stand-In</h1>
        <p className="subtitle">
          AI representation of Dr. Ahmed's approved OOP / Java knowledge.
        </p>

        <div className="notice">
          This is an AI system, not Dr. Ahmed. It does not make decisions
          requiring the professor's personal judgment.
        </div>

        <label>Ask a question</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Example: What is the difference between an abstract class and an interface?"
        />

        <button onClick={askStandIn} disabled={loading}>
          {loading ? "Thinking..." : "Ask Stand-In"}
        </button>

        {answer && (
          <div className="answer">
            <h2>Stand-In Response</h2>
            <p>{answer}</p>
            {sources.length > 0 && (
              <>
                <h3>Retrieved knowledge</h3>
                <ul>{sources.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);