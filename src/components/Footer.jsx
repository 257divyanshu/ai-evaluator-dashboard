export default function Footer() {
  return (
    <footer className="bg-transparent text-gray-500 text-sm text-center py-6 border-t border-gray-300 mt-8">
      <p>
        © {new Date().getFullYear()} AI Evaluator Dashboard — All Rights Reserved
      </p>
      <p className="mt-1">
        Explore research, test models, and contribute to better AI evaluation.
      </p>
    </footer>
  );
}
