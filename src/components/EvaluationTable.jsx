export default function EvaluationTable({ evaluations }) {
  if (!evaluations || evaluations.length === 0) {
    return <p className="text-gray-500 mt-4">No evaluations yet.</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-xl">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b text-left">Prompt</th>
            <th className="py-2 px-4 border-b text-left">Accuracy</th>
            <th className="py-2 px-4 border-b text-left">Relevance</th>
            <th className="py-2 px-4 border-b text-left">Clarity</th>
            <th className="py-2 px-4 border-b text-left">Helpfulness</th>
            <th className="py-2 px-4 border-b text-left">Type</th>
            <th className="py-2 px-4 border-b text-left">Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {evaluations.map((e, index) => {
            // 🧠 Use metrics if available, otherwise fallback to autoMetrics
            const m = e.metrics || e.autoMetrics || {};

            return (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition text-sm"
              >
                <td className="py-2 px-4 max-w-xs truncate">{e.prompt}</td>
                <td className="py-2 px-4 text-center">{m.accuracy ?? "-"}</td>
                <td className="py-2 px-4 text-center">{m.relevance ?? "-"}</td>
                <td className="py-2 px-4 text-center">{m.clarity ?? "-"}</td>
                <td className="py-2 px-4 text-center">{m.helpfulness ?? "-"}</td>
                <td className="py-2 px-4 text-center">
                  {e.autoMetrics ? "🤖 Auto" : "🧠 Manual"}
                </td>
                <td className="py-2 px-4 text-gray-500 text-xs">
                  {new Date(e.timestamp).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
