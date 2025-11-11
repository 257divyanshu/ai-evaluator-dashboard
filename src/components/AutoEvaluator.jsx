import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Toaster from "./Toaster";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function AutoEvaluator({
  prompt,
  response,
  model, // ✅ get currently selected model
  onAutoEvalComplete,
  onStartAutoEval,
}) {
  const [loading, setLoading] = useState(false);
  const [autoEval, setAutoEval] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // 🧹 Reset auto evaluation when prompt or response changes
  useEffect(() => {
    if (prompt || response) {
      setAutoEval(null);
    }
  }, [prompt, response]);

  const handleAutoEvaluate = async () => {
    if (!prompt || !response) return;

    if (onStartAutoEval) onStartAutoEval();

    setLoading(true);

    try {
      // ✅ Use the same model as selected by user
      const evaluatorModel = genAI.getGenerativeModel({ model: model || "gemini-2.5-pro" });

      // 🔍 Log which model is being used
      console.log(
        `%c🔎 AutoEvaluator: Requesting evaluation from model → ${model}`,
        "color: #4f46e5; font-weight: bold;"
      );

      const rubric = `
You are an AI evaluator. Evaluate the following AI response on a scale of 1–5
for these metrics:
- Accuracy
- Relevance
- Clarity
- Helpfulness

Return only a valid JSON in this format:
{
  "accuracy": <number>,
  "relevance": <number>,
  "clarity": <number>,
  "helpfulness": <number>,
  "comment": "<short comment>"
}

PROMPT: """${prompt}"""
RESPONSE: """${response}"""
`;

      const result = await evaluatorModel.generateContent(rubric);
      const text = result.response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setAutoEval(parsed);
        onAutoEvalComplete(parsed);
        triggerToast("🤖 Auto-evaluation completed!");
      } else {
        throw new Error("Could not parse model output.");
      }
    } catch (err) {
      console.error("LLM-as-a-Judge Error:", err);
      triggerToast("⚠️ Auto-evaluation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      {showToast && <Toaster message={toastMessage} />}
      <h3 className="font-semibold text-lg mb-3">🤖 Auto Evaluation (LLM-as-a-Judge)</h3>

      <button
        onClick={handleAutoEvaluate}
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } transition`}
      >
        {loading ? "Evaluating..." : "Run Auto Evaluation"}
      </button>

      {autoEval && (
        <div className="mt-4 bg-gray-50 border p-3 rounded-lg text-sm">
          <p>
            <strong>Accuracy:</strong> {autoEval.accuracy}
          </p>
          <p>
            <strong>Relevance:</strong> {autoEval.relevance}
          </p>
          <p>
            <strong>Clarity:</strong> {autoEval.clarity}
          </p>
          <p>
            <strong>Helpfulness:</strong> {autoEval.helpfulness}
          </p>
          <p className="mt-2 text-gray-600 italic">💬 {autoEval.comment}</p>
        </div>
      )}
    </div>
  );
}
