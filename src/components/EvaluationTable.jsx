export default function EvaluationTable({ evaluations }) {
  if (!evaluations.length)
    return <p className="text-gray-500 italic">No evaluations yet.</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
      <h3 className="font-semibold text-lg mb-4">Saved Evaluations</h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Prompt</th>
            <th className="p-2">Accuracy</th>
            <th className="p-2">Relevance</th>
            <th className="p-2">Clarity</th>
            <th className="p-2">Helpfulness</th>
            <th className="p-2">Safety</th>
            <th className="p-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((e, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{e.prompt}</td>
              <td className="p-2 text-center">{e.metrics.accuracy}</td>
              <td className="p-2 text-center">{e.metrics.relevance}</td>
              <td className="p-2 text-center">{e.metrics.clarity}</td>
              <td className="p-2 text-center">{e.metrics.helpfulness}</td>
              <td className="p-2 text-center">{e.metrics.safety}</td>
              <td className="p-2">{e.metrics.notes || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
