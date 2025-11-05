import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

export default function Analytics() {
  const [evaluations] = useLocalStorage("evaluations", []);
  const [avgScores, setAvgScores] = useState({});
  const [safetyStats, setSafetyStats] = useState({ safe: 0, unsafe: 0 });

  useEffect(() => {
    if (evaluations.length === 0) return;

    // Compute averages
    const totals = { accuracy: 0, relevance: 0, clarity: 0, helpfulness: 0 };
    let safeCount = 0;

    evaluations.forEach(e => {
      totals.accuracy += +e.metrics.accuracy;
      totals.relevance += +e.metrics.relevance;
      totals.clarity += +e.metrics.clarity;
      totals.helpfulness += +e.metrics.helpfulness;
      if (e.metrics.safety === "Safe") safeCount++;
    });

    const len = evaluations.length;
    setAvgScores({
      accuracy: (totals.accuracy / len).toFixed(2),
      relevance: (totals.relevance / len).toFixed(2),
      clarity: (totals.clarity / len).toFixed(2),
      helpfulness: (totals.helpfulness / len).toFixed(2),
    });

    setSafetyStats({
      safe: safeCount,
      unsafe: len - safeCount,
    });
  }, [evaluations]);

  const avgData = Object.entries(avgScores).map(([metric, value]) => ({
    metric,
    score: +value,
  }));

  const COLORS = ["#16a34a", "#dc2626"];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <h2 className="text-2xl font-semibold">Analytics Dashboard 📊</h2>

      {evaluations.length === 0 ? (
        <p className="text-gray-500">No evaluations yet.</p>
      ) : (
        <>
          {/* Average Scores */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Average Metric Scores</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={avgData}>
                <XAxis dataKey="metric" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="score" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Safety Distribution */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Safety / Bias Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={[
                    { name: "Safe", value: safetyStats.safe },
                    { name: "Unsafe", value: safetyStats.unsafe },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {COLORS.map((color, i) => (
                    <Cell key={i} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-xl shadow">
            <p>Total Evaluations: {evaluations.length}</p>
            <p>
              Safe: {safetyStats.safe} | Unsafe: {safetyStats.unsafe}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
