import { useState } from "react";
import PromptInput from "../components/PromptInput";
import ResponseViewer from "../components/ResponseViewer";
import EvaluationPanel from "../components/EvaluationPanel";
import EvaluationTable from "../components/EvaluationTable";
import useLocalStorage from "../hooks/useLocalStorage";
import Toaster from "../components/Toaster";
import ModelSelector from "../components/ModelSelector";
import AutoEvaluator from "../components/AutoEvaluator";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function Evaluate() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [evaluations, setEvaluations] = useLocalStorage("evaluations", []);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [model, setModel] = useState("gemini-2.5-flash");
  const [autoEvalDone, setAutoEvalDone] = useState(false); // 🆕 Added

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
    }, 2000);
  };

  // 🔹 When user submits a prompt, we reset auto-eval state
  const handlePromptSubmit = async (userPrompt) => {
    setPrompt(userPrompt);
    setResponse("⏳ Generating response...");
    setAutoEvalDone(false); // 🆕 Reset here

    try {
      const modelInstance = genAI.getGenerativeModel({ model });
      const result = await modelInstance.generateContent(userPrompt);
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

  const handleAutoEvalComplete = (autoScores) => {
    const newEval = {
      prompt,
      response,
      autoMetrics: autoScores,
      model,
      timestamp: new Date().toISOString(),
    };
    setEvaluations([...evaluations, newEval]);
    setAutoEvalDone(true); // 🆕 Hide EvaluationPanel after auto-eval
  };

  const handleSaveEvaluation = (scores) => {
    const newEval = {
      prompt,
      response,
      metrics: scores,
      model,
      timestamp: new Date().toISOString(),
    };
    setEvaluations([...evaluations, newEval]);
    setResponse("");
    triggerToast("✅ Evaluation saved successfully!");
  };

  const handleClearAll = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all saved evaluations? This action cannot be undone."
    );
    if (confirmClear) {
      setEvaluations([]);
      setResponse("");
      triggerToast("🗑️ All evaluations cleared!");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {showToast && <Toaster message={toastMessage} />}

      {/* 🧠 Model Selector */}
      <ModelSelector model={model} setModel={setModel} />

      {/* 🧩 Evaluation Interface */}
      <PromptInput onSubmit={handlePromptSubmit} />
      <ResponseViewer response={response} />

      {/* 🤖 Auto Evaluator */}
      {response && (
        <AutoEvaluator
          prompt={prompt}
          response={response}
          model={model} // ✅ add this
          onAutoEvalComplete={handleAutoEvalComplete}
          onStartAutoEval={() => setAutoEvalDone(true)} // 🆕 Hides EvaluationPanel instantly
        />
      )}

      {/* 🧠 Manual Evaluator (only if auto eval not done) */}
      {response && !autoEvalDone && (
        <EvaluationPanel onSave={handleSaveEvaluation} />
      )}

      <EvaluationTable evaluations={evaluations} />

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
