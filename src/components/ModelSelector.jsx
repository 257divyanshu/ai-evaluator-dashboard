export default function ModelSelector({ model, setModel }) {
  const models = [
    {
      id: "gemini-2.5-flash",
      name: "Gemini 2.5 Flash ⚡",
      tagline: "Recommended — fast, reliable, balanced reasoning",
    },
    {
      id: "gemini-2.5-pro",
      name: "Gemini 2.5 Pro 🧠",
      tagline: "Advanced reasoning for complex multi-turn tasks",
    },
    {
      id: "gemini-2.5-flash-lite",
      name: "Gemini 2.5 Flash Lite 🚀",
      tagline: "Ultra-fast lightweight model for quick tests",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h3 className="font-semibold text-gray-800 mb-4 text-lg">
        🤖 Select Evaluation Model
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {models.map((m) => (
          <button
            key={m.id}
            onClick={() => setModel(m.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              model === m.id
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
            }`}
          >
            <div className="font-medium text-gray-900 flex items-center gap-2">
              {m.name}
              {model === m.id && (
                <span className="text-blue-600 text-sm font-semibold">✓</span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1 leading-snug">{m.tagline}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
