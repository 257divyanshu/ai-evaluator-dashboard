import { useState } from "react";

export default function EvaluationPanel({ onSave }) {
  const [scores, setScores] = useState({
    accuracy: 3,
    relevance: 3,
    clarity: 3,
    helpfulness: 3,
    safety: "Safe",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScores({ ...scores, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(scores);
    setScores({
      accuracy: 3,
      relevance: 3,
      clarity: 3,
      helpfulness: 3,
      safety: "Safe",
      notes: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow mb-6"
    >
      <h3 className="font-semibold text-lg mb-4">Evaluate Response</h3>

      {["accuracy", "relevance", "clarity", "helpfulness"].map((metric) => (
        <div key={metric} className="mb-3">
          <label className="capitalize font-medium">{metric}</label>
          <input
            type="range"
            name={metric}
            min="0"
            max="5"
            value={scores[metric]}
            onChange={handleChange}
            className="w-full"
          />
          <div className="text-sm text-gray-600">Score: {scores[metric]}</div>
        </div>
      ))}

      <div className="mb-3">
        <label className="font-medium">Safety / Bias</label>
        <select
          name="safety"
          value={scores.safety}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          <option value={'Safe'}>Safe</option>
          <option value={'Unsafe'}>Unsafe</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="font-medium">Evaluator Notes</label>
        <textarea
          name="notes"
          value={scores.notes}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
          placeholder="Add comments about correctness, missing details, etc."
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Save Evaluation
      </button>
    </form>
  );
}
