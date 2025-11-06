import { useState } from "react";
import PromptInput from "../components/PromptInput";
import ResponseViewer from "../components/ResponseViewer";
import EvaluationPanel from "../components/EvaluationPanel";
import EvaluationTable from "../components/EvaluationTable";
import useLocalStorage from "../hooks/useLocalStorage";
import Toaster from "../components/Toaster";
import { GoogleGenerativeAI } from "@google/generative-ai";


// Initialize Gemini client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function Evaluate() {
  const [response, setResponse] = useState("");
  const [evaluations, setEvaluations] = useLocalStorage("evaluations", []);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // 🔔 Utility function to trigger toast
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
    }, 2000);
  };

  const handlePromptSubmit = async (prompt) => {

    console.log("Loaded API key:", import.meta.env.VITE_GEMINI_API_KEY ? "✅ Present" : "❌ Missing");

    // old : Simulating model output for now
    // const mockResponse = `This is a mock response for: ${prompt}.`;
    // setResponse(mockResponse);

    // new : fetching a real response
    setResponse("⏳ Generating response...");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // generateContent() syntax changed slightly in new SDK
      const result = await model.generateContent(prompt);
      const output = result.response.text();

      if (output) {
        setResponse(output);
        triggerToast("🤖 Gemini response generated successfully!");
      } else {
        throw new Error("Empty response");
      }
    } catch (err) {
      console.error("Gemini fetch error:", err);
      triggerToast("⚠️ Failed to fetch Gemini response.");
      setResponse("");
    }
  };

  const handleSaveEvaluation = (scores) => {
    const newEval = {
      prompt: response.replace("This is a mock response for: ", "").slice(0, -1),
      metrics: scores,
      timestamp: new Date().toISOString(),
    };
    setEvaluations([...evaluations, newEval]);
    // 🧹 Clear AI response after save
    setResponse("");
    // ✅ Show success toast
    triggerToast("✅ Evaluation saved successfully!");
  };

  // 🧹 Handle clear all evaluations
  const handleClearAll = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all saved evaluations? This action cannot be undone."
    );
    if (confirmClear) {
      setEvaluations([]); // clears localStorage automatically
      setResponse("");
      triggerToast("🗑️ All evaluations cleared!");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* ✅ Centralized Toaster */}
      {showToast && <Toaster message={toastMessage} />}
      <PromptInput onSubmit={handlePromptSubmit} />
      <ResponseViewer response={response} />
      {response && <EvaluationPanel onSave={handleSaveEvaluation} />}
      <EvaluationTable evaluations={evaluations} />
      {/* 🧹 Clear All Button */}
      {evaluations.length > 0 && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleClearAll}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Clear All Evaluations
          </button>
        </div>
      )}
    </div>
  );
}
