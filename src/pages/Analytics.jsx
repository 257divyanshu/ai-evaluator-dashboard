import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useLocalStorage from "../hooks/useLocalStorage";
import { useMemo } from "react";

export default function Analytics() {
  const [evaluations] = useLocalStorage("evaluations", []);

  // --- 📊 Trend Data (grouped by date) ---
  const trendData = useMemo(() => {
    const grouped = {};
    evaluations.forEach((e) => {
      const d = e.timestamp.split("T")[0];
      if (!grouped[d])
        grouped[d] = {
          date: d,
          accuracy: 0,
          relevance: 0,
          clarity: 0,
          helpfulness: 0,
          count: 0,
        };
      grouped[d].accuracy += +e.metrics.accuracy;
      grouped[d].relevance += +e.metrics.relevance;
      grouped[d].clarity += +e.metrics.clarity;
      grouped[d].helpfulness += +e.metrics.helpfulness;
      grouped[d].count++;
    });
    return Object.values(grouped).map((v) => ({
      date: v.date,
      accuracy: +(v.accuracy / v.count).toFixed(2),
      relevance: +(v.relevance / v.count).toFixed(2),
      clarity: +(v.clarity / v.count).toFixed(2),
      helpfulness: +(v.helpfulness / v.count).toFixed(2),
    }));
  }, [evaluations]);

  // --- 🧩 Model-wise Data ---
  const modelData = useMemo(() => {
    const grouped = {};
    evaluations.forEach((e) => {
      const m = e.model || "Gemini";
      if (!grouped[m])
        grouped[m] = {
          model: m,
          accuracy: 0,
          relevance: 0,
          clarity: 0,
          helpfulness: 0,
          count: 0,
        };
      grouped[m].accuracy += +e.metrics.accuracy;
      grouped[m].relevance += +e.metrics.relevance;
      grouped[m].clarity += +e.metrics.clarity;
      grouped[m].helpfulness += +e.metrics.helpfulness;
      grouped[m].count++;
    });
    return Object.values(grouped).map((v) => ({
      model: v.model,
      accuracy: +(v.accuracy / v.count).toFixed(2),
      relevance: +(v.relevance / v.count).toFixed(2),
      clarity: +(v.clarity / v.count).toFixed(2),
      helpfulness: +(v.helpfulness / v.count).toFixed(2),
    }));
  }, [evaluations]);

  // --- 💾 Export Handlers ---
  const handleExport = (format = "csv") => {
    if (!evaluations.length) return;
    if (format === "csv") {
      const header =
        "Prompt,Accuracy,Relevance,Clarity,Helpfulness,Safety,Model,Timestamp\n";
      const rows = evaluations.map(
        (e) =>
          `"${e.prompt}",${e.metrics.accuracy},${e.metrics.relevance},${e.metrics.clarity},${e.metrics.helpfulness},${e.metrics.safety},${e.model || "Gemini"},${e.timestamp}`
      );
      const blob = new Blob([header + rows.join("\n")], {
        type: "text/csv",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "evaluations.csv";
      link.click();
    } else {
      const blob = new Blob([JSON.stringify(evaluations, null, 2)], {
        type: "application/json",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "evaluations.json";
      link.click();
    }
  };

  // --- 🧾 Render ---
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      <h2 className="text-2xl font-semibold">Advanced Analytics Dashboard 📊</h2>

      {evaluations.length === 0 ? (
        <p className="text-gray-500">No evaluations yet.</p>
      ) : (
        <>
          {/* --- Summary Cards --- */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <h4 className="font-medium text-gray-500">Total Evaluations</h4>
              <p className="text-2xl font-semibold">{evaluations.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <h4 className="font-medium text-gray-500">Avg Accuracy</h4>
              <p className="text-2xl font-semibold">
                {trendData.length
                  ? trendData[trendData.length - 1].accuracy
                  : "-"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <h4 className="font-medium text-gray-500">Avg Clarity</h4>
              <p className="text-2xl font-semibold">
                {trendData.length
                  ? trendData[trendData.length - 1].clarity
                  : "-"}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <h4 className="font-medium text-gray-500">Avg Helpfulness</h4>
              <p className="text-2xl font-semibold">
                {trendData.length
                  ? trendData[trendData.length - 1].helpfulness
                  : "-"}
              </p>
            </div>
          </div>

          {/* --- Trend Chart --- */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Performance Trend Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line
                  dataKey="accuracy"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: "#2563eb", r: 5 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  dataKey="relevance"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={{ fill: "#16a34a", r: 5 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  dataKey="clarity"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: "#f59e0b", r: 5 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  dataKey="helpfulness"
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={{ fill: "#dc2626", r: 5 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* --- Model Comparison Chart --- */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Model-wise Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={modelData}>
                <XAxis dataKey="model" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="accuracy" fill="#2563eb" />
                <Bar dataKey="clarity" fill="#f59e0b" />
                <Bar dataKey="relevance" fill="#16a34a" />
                <Bar dataKey="helpfulness" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* --- Export Buttons --- */}
          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={() => handleExport("csv")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Export CSV
            </button>
            <button
              onClick={() => handleExport("json")}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Export JSON
            </button>
          </div>
        </>
      )}
    </div>
  );
}
