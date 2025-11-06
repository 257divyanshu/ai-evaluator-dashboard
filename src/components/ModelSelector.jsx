export default function ModelSelector({ model, setModel }) {
  const models = [
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash ⚡ (Recommended)" },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro 🧠 (Advanced reasoning)" },
    { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite 🚀 (Ultra-fast)" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <label htmlFor="modelSelect" className="font-medium text-gray-800">
        Select Model:
      </label>
      <select
        id="modelSelect"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
    </div>
  );
}
