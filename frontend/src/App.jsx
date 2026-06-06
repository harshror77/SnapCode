import { Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import View from "./pages/View";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/:slug" element={<View />} />
      </Routes>
    </div>
  );
}
