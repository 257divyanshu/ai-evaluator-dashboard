import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-xl font-semibold">AI Evaluator Dashboard</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/evaluate" className="hover:text-blue-600">Evaluate</Link>
        <Link to="/analytics" className="hover:text-blue-600">Analytics</Link>
      </div>
    </nav>
  );
}
