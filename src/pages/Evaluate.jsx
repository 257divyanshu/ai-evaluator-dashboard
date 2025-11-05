import { useState } from "react";
import PromptInput from "../components/PromptInput";
import ResponseViewer from "../components/ResponseViewer";
import EvaluationPanel from "../components/EvaluationPanel";
import EvaluationTable from "../components/EvaluationTable";

export default function Evaluate() {
  const [response, setResponse] = useState("");
  const [evaluations, setEvaluations] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const handlePromptSubmit = (prompt) => {
    // Simulate model output for now
    const mockResponse = `This is a mock response for: "${prompt}".`;
    setResponse(mockResponse);
  };

  const handleSaveEvaluation = (scores) => {
    const newEval = {
      prompt: response.replace("This is a mock response for: ", "").slice(0,-1),
      metrics: scores,
      timestamp: new Date().toISOString(),
    };
    setEvaluations([...evaluations, newEval]);
    // 🧹 Clear AI response after save
    setResponse("");
    // ✅ Show success toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* ✅ Success Toast */}
      {showToast && (
        <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          Evaluation saved successfully ✅
        </div>
      )}
      <PromptInput onSubmit={handlePromptSubmit} />
      <ResponseViewer response={response} />
      {response && <EvaluationPanel onSave={handleSaveEvaluation} />}
      <EvaluationTable evaluations={evaluations} />
    </div>
  );
}
