// src/pages/Lost.jsx
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import DynamicForm from "../components/forms/DynamicForm";
import { useNavigate } from "react-router-dom";

export default function Lost() {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const categories = [
    { value: "phone", label: "Phone" },
    { value: "wallet", label: "Wallet" },
    { value: "keys", label: "Keys" },
    { value: "laptop", label: "Laptop" },
    { value: "bag", label: "Bag / Backpack" },
    { value: "other", label: "Other" },
  ];

  const handleResults = (results) => {
    navigate("/results", { state: { results: results.matches, category } });
  };

  return (
    <section className="min-h-screen bg-black/95 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white">Search Lost Item</h1>
            <p className="text-gray-400">Select category to begin</p>
          </div>

          {!category ? (
            <div className="relative">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full appearance-none bg-white/10 border border-white/20 text-white rounded-2xl px-6 py-5 pr-12 text-lg font-medium focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Choose Category</option>
                {categories.map(c => (
                  <option key={c.value} value={c.value} className="bg-gray-900">
                    {c.label}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-xl pointer-events-none" />
            </div>
          ) : (
            <DynamicForm
              category={category}
              onSubmit={handleResults}
              onBack={() => setCategory("")}
            />
          )}
        </div>
      </div>
    </section>
  );
}