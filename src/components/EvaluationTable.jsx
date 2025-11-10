export default function EvaluationTable({ evaluations }) {
  if (!evaluations || evaluations.length === 0) {
    return <p className="text-gray-500 mt-4">No evaluations yet.</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-xl">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b text-left w-56">Prompt</th>
            <th className="py-2 px-4 border-b text-center">Accuracy</th>
            <th className="py-2 px-4 border-b text-center">Relevance</th>
            <th className="py-2 px-4 border-b text-center">Clarity</th>
            <th className="py-2 px-4 border-b text-center">Helpfulness</th>
            <th className="py-2 px-4 border-b text-center">Type</th>
            <th className="py-2 px-4 border-b text-center">Note</th>
            <th className="py-2 px-4 border-b text-left">Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {evaluations.map((e, index) => {
            const m = e.metrics || e.autoMetrics || {};
            const note = m.comment || m.note || "";
            const promptText = e.prompt || "";

            return (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition text-sm"
              >
                {/* 🧠 Prompt column (truncated + tooltip on hover) */}
                <td className="py-2 px-4 text-left max-w-[12rem]">
                  <div className="relative group cursor-pointer">
                    <span
                      className="block truncate text-gray-800"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {promptText.length > 35
                        ? `${promptText.split(" ").slice(0, 4).join(" ")}...`
                        : promptText}
                    </span>

                    {/* Tooltip — same as before, but nudged slightly right */}
                    {promptText && (
                      //     <div
                      //       className="absolute bottom-full left-1/2 translate-x-4 mb-2 
                      //  hidden group-hover:block w-64 bg-white border-[1px] border-black text-xs 
                      //  rounded-lg p-2 shadow-lg z-50 whitespace-normal break-words"
                      //     >
                      <div
                        className="absolute bottom-full left-1/2 translate-x-4 -translate-x-1/2 mb-2 hidden group-hover:block bg-white border border-black text-xs rounded-lg 
               p-3 shadow-lg z-50 whitespace-normal break-words max-w-[20vw] inline-block"
                        style={{ width: "max-content", maxWidth: "20vw" }}
                      >
                        {promptText}
                      </div>
                    )}
                  </div>
                </td>

                {/* Scores */}
                <td className="py-2 px-4 text-center">{m.accuracy ?? "-"}</td>
                <td className="py-2 px-4 text-center">{m.relevance ?? "-"}</td>
                <td className="py-2 px-4 text-center">{m.clarity ?? "-"}</td>
                <td className="py-2 px-4 text-center">{m.helpfulness ?? "-"}</td>

                {/* Type */}
                <td className="py-2 px-4 text-center">
                  {e.autoMetrics ? "🤖 Auto" : "🧠 Manual"}
                </td>

                {/* 📝 Note tooltip (same as before) */}
                <td className="py-2 px-4 text-center">
                  {note ? (
                    <div className="relative group inline-block cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-800 text-lg">
                        📝
                      </span>
                      {/* <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-56 bg-white border-[1px] border-black text-xs rounded-lg p-2 shadow-lg z-10"> */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-white border border-black text-xs rounded-lg p-2 shadow-lg z-50 whitespace-normal break-words max-w-[20vw] inline-block"
                        style={{ width: "max-content", maxWidth: "20vw" }}>
                        {note}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">–</span>
                  )}
                </td>

                {/* Timestamp */}
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
