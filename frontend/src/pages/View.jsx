import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { getSnippet } from "../api/snippets";

export default function View() {
  const { slug } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getSnippet(slug)
      .then(({ data }) => setSnippet(data))
      .catch(() => setError(true));
  }, [slug]);

  const copy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error) return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-red-400">Snippet not found or expired.</p>
      <Link to="/" className="text-indigo-400 text-sm mt-2 inline-block">← Create new</Link>
    </div>
  );

  if (!snippet) return <div className="p-6 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">{snippet.title || "Untitled"}</h1>
          <span className="text-xs text-gray-500">{snippet.language}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copy}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-1.5 rounded text-sm transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded text-sm transition"
          >
            + New
          </Link>
        </div>
      </div>

      <div className="rounded overflow-hidden border border-gray-700">
        <Editor
          height="400px"
          language={snippet.language}
          value={snippet.code}
          theme="vs-dark"
          options={{ fontSize: 14, minimap: { enabled: false }, readOnly: true, scrollBeyondLastLine: false }}
        />
      </div>

      <p className="text-xs text-gray-600 mt-3">
        Share: <span className="text-gray-400">{window.location.href}</span>
      </p>
    </div>
  );
}
