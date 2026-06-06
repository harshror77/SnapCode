import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { createSnippet } from "../api/snippets";

const LANGUAGES = ["javascript", "python", "typescript", "cpp", "java", "go", "rust", "html", "css", "json"];

export default function Create() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const { data } = await createSnippet({ title, code, language });
      navigate(`/${data.slug}`);
    } catch {
      alert("Failed to create snippet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Snap<span className="text-indigo-400">Code</span>
      </h1>

      <div className="flex gap-3 mb-3">
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="rounded overflow-hidden border border-gray-700 mb-4">
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={(val) => setCode(val || "")}
          theme="vs-dark"
          options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !code.trim()}
        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-6 py-2 rounded font-medium text-sm transition"
      >
        {loading ? "Saving..." : "Create Snippet →"}
      </button>
    </div>
  );
}
