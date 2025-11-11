import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Evaluate from "./pages/Evaluate.jsx";
import Analytics from "./pages/Analytics.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-indigo-50 text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/evaluate" element={<Evaluate />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
