import { useState } from "react";
import PromptInput from "../components/PromptInput";
import ResponseViewer from "../components/ResponseViewer";
import EvaluationPanel from "../components/EvaluationPanel";
import EvaluationTable from "../components/EvaluationTable";
import useLocalStorage from "../hooks/useLocalStorage";
import Toaster from "../components/Toaster";

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

  const handlePromptSubmit = (prompt) => {
    // Simulate model output for now
    const mockResponse = `This is a mock response for: ${prompt}.`;
    setResponse(mockResponse);
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
