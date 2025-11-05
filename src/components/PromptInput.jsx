import { useState } from "react";

export default function PromptInput({ onSubmit }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt);
    setPrompt("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col sm:flex-row gap-3"
    >
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt (e.g., Explain hoisting in JavaScript)"
        className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Generate Response
      </button>
    </form>
  );
}
