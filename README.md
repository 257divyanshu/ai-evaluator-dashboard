# 🧠 AI Evaluator Dashboard  
A lightweight research dashboard to evaluate, compare, and analyze large language model (LLM) outputs — scientifically and visually.  

---

# 📖 Overview  
**AI Evaluator Dashboard** is a modern web application designed to assess the performance of large language models (LLMs) using both **manual** and **automated** evaluation techniques.  

It provides an intuitive interface to rate AI responses on key metrics — **accuracy, clarity, relevance, helpfulness** — and visualize results with rich analytics. Built as part of a hands-on exploration into AI evaluation workflows, this project bridges research and usability for developers, students, and AI practitioners.

---

👉 **Try it here:** [https://ai-evaluator-dashboard.vercel.app](https://ai-evaluator-dashboard.vercel.app)

---

# 🧰 Tech Stack  
| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | React (Vite) |
| **Styling** | Tailwind CSS |
| **Charts & Visuals** | Recharts |
| **LLM API** | Google Gemini (Generative AI SDK) |
| **State Persistence** | LocalStorage (via custom hook) |
| **Hosting** | Vercel |

---

# 🎯 Core Features  

- 🧩 **Manual Evaluation** — Score AI responses manually across key metrics  
- 🤖 **LLM-as-a-Judge (Auto Evaluation)** — Uses Gemini to evaluate AI outputs automatically  
- 📊 **Analytics Dashboard** — Visualize performance trends, model comparisons & safety distribution  
- 💾 **Local Persistence** — Evaluations auto-saved in browser storage  
- 📤 **Export Options** — Export all evaluations as CSV or JSON  
- ⚙️ **Model Selector** — Choose from multiple Gemini models (Flash, Pro, Lite)  
- 💬 **Notes + Tooltips** — Add evaluator comments and view detailed context without clutter  
- 🧠 **Responsive & Clean UI** — Designed for research productivity across devices  

---

# 🔬 Advanced Evaluation Techniques  

This dashboard implements and explores several **industry-grade evaluation methods** for LLMs.  
Currently, **LLM-as-a-Judge** is fully implemented, and other advanced techniques are in active development.  

| Technique | Description | Status | Blog |
|------------|--------------|--------|------|
| **LLM-as-a-Judge** | Use one LLM to evaluate another model’s outputs objectively. | ✅ Implemented | [Read Blog →](https:///divyanshusahu.com/blog/llm-as-judge)
| **Embedding Similarity** | Measure semantic similarity between model responses and ideal references using vector embeddings. | 🧩 Coming Soon | [Read Blog →](https://divyanshusahu.com/blog/embedding-similarity) |
| **Self-Consistency Check** | Assess output reliability by comparing multiple generations for the same prompt. | 🧩 Coming Soon | [Read Blog →](https://divyanshusahu.com/blog/self-consistency-check) |
| **Automated Bias & Safety Detection** | Detect bias, toxicity, or unsafe model responses automatically. | 🧩 Coming Soon | [Read Blog →](https://divyanshusahu.com/blog/automated-bias-and-safety-detection) |
| **Prompt Tagging System** | Categorize prompts (reasoning, factual, creative, etc.) to analyze behavior by type. | 🧩 Coming Soon | [Read Blog →](https://divyanshusahu.com/blog/prompt-tagging-system) |

---

# ⚙️ Installation & Setup  

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ai-evaluator-dashboard.git
cd ai-evaluator-dashboard
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Add Environment Variables

Create a `.env` file in the project root:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

*(Ensure `.env` is in your `.gitignore`!)*

### 4️⃣ Run Locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

# 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Deployment

This project is deployed on **Vercel** using continuous integration from GitHub.
Set your environment variable (`VITE_GEMINI_API_KEY`) in the Vercel dashboard under *Project Settings → Environment Variables*.

---

# 🧑‍💻 Project Structure

```
src/
┣ assets/
┃ ┗ react.svg
┣ components/
┃ ┣ AutoEvaluator.jsx
┃ ┣ EvaluationPanel.jsx
┃ ┣ EvaluationTable.jsx
┃ ┣ Footer.jsx
┃ ┣ ModelSelector.jsx
┃ ┣ Navbar.jsx
┃ ┣ PromptInput.jsx
┃ ┣ ResponseViewer.jsx
┃ ┗ Toaster.jsx
┣ hooks/
┃ ┗ useLocalStorage.jsx
┣ pages/
┃ ┣ Analytics.jsx
┃ ┣ Evaluate.jsx
┃ ┗ Home.jsx
┣ App.css
┣ App.jsx
┣ index.css
┗ main.jsx
```

---

# 📈 Future Enhancements

* ✳️ Add **Embedding Similarity** metric
* ♻️ Implement **Self-Consistency Check** for reliability evaluation
* 🔍 Integrate **Bias & Safety Detection** with visual insights
* 🏷️ Add **Prompt Tagging System** for categorical analytics
* ☁️ Optional **cloud sync** for evaluation history
* 🔄 **Dual-model comparison mode** for side-by-side LLM testing

---

# 🤝 Contributing

Contributions and ideas are welcome!
If you'd like to collaborate, open an issue or a pull request describing your proposed improvements.

---

🔗 [LinkedIn Profile](https://www.linkedin.com/in/257divyanshu/)
🔗 [My Blog](https://divyanshusahu.com/blog)
