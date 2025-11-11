import { Link } from "react-router-dom";

export default function Home() {
  const blogs = [
    {
      title: "LLM-as-a-Judge (Auto Evaluation)",
      desc: "Automate evaluation by using one LLM to assess another, a research-backed method already live in this dashboard.",
      link: "https://divyanshusahu.com/blog/llm-as-judge",
      status: "✅ Implemented",
    },
    {
      title: "Embedding Similarity",
      desc: "Measure semantic similarity between model outputs and ideal answers using vector embeddings.",
      link: "https://divyanshusahu.com/blog/embedding-similarity",
      status: "📆 Coming Soon",
    },
    {
      title: "Self-Consistency Check",
      desc: "Ensure reliability by generating multiple responses and evaluating their consistency.",
      link: "https://divyanshusahu.com/blog/self-consistency-check",
      status: "📆 Coming Soon",
    },
    {
      title: "Automated Bias & Safety Detection",
      desc: "Detect bias or unsafe responses using automated classifiers and ethical evaluation models.",
      link: "https://divyanshusahu.com/blog/automated-bias-and-safety-detection",
      status: "📆 Coming Soon",
    },
    {
      title: "Prompt Tagging System",
      desc: "Tag prompts by type (creative, factual, reasoning) to analyze model behavior across categories.",
      link: "https://divyanshusahu.com/blog/prompt-tagging-system",
      status: "📆 Coming Soon",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center text-center p-6">
      {/* 🧠 Hero Section */}
      <div className="flex flex-col items-center justify-center flex-1 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          Evaluate, Compare & Improve AI Responses Scientifically.
        </h1>
        <p className="text-gray-600 max-w-2xl mb-8 text-lg">
          A lightweight LLM evaluation dashboard that lets you assess AI outputs
          for accuracy, clarity, relevance, and helpfulness.
        </p>

        <div className="flex gap-4 flex-wrap justify-center mb-10">
          <Link
            to="/evaluate"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Start Evaluating
          </Link>
          <Link
            to="/analytics"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
          >
            View Analytics
          </Link>
        </div>

        <p className="text-lg font-bold text-gray-500 italic">
          MVP edition
        </p>
      </div>

      {/* 🚀 Advanced Techniques Section */}
      <div className="w-full max-w-5xl mt-16">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
          Advanced Evaluation Techniques 🔬
        </h2>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          This dashboard already includes <b>LLM-as-a-Judge</b>, a cutting-edge
          automated evaluation method.  
          More advanced techniques are currently in development, and you can
          explore detailed blogs about each below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md hover:shadow-lg p-5 text-left border border-gray-100 hover:border-gray-300 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {item.title}
                </h3>
                <span className="text-xs text-gray-500">{item.status}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
