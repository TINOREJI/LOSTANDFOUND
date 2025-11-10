// src/components/forms/DynamicForm.jsx
import { useState, useEffect } from "react";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import { getQuestionnaire, searchLostItems } from "../../services/api";

export default function DynamicForm({ category, onSubmit, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getQuestionnaire(category);
        setQuestions(res.questions || []);
      } catch (err) {
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchQuestions();
  }, [category]);

  // Re-evaluate completion
  useEffect(() => {
    const allRequiredFilled = questions
      .filter(q => !q.dependsOn) // Only top-level
      .every(q => answers[q.id]?.trim());

    setIsComplete(allRequiredFilled);
  }, [answers, questions]);

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!isComplete) return;

    try {
      const results = await searchLostItems({
        category,
        answers,
      });
      onSubmit(results);
    } catch (err) {
      setError("Search failed.");
    }
  };

  const renderQuestion = (q) => {
    const value = answers[q.id] || "";
    const showSub = q.dependsOn && answers[q.dependsOn.id] === q.dependsOn.value;

    return (
      <div key={q.id} className={`space-y-2 ${q.dependsOn ? "ml-6 mt-4 border-l-2 border-orange-500/30 pl-4" : ""}`}>
        <label className="block text-white font-medium text-lg">{q.label}</label>
        {q.type === "select" ? (
          <div className="relative">
            <select
              value={value}
              onChange={e => handleChange(q.id, e.target.value)}
              className="w-full appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              <option value="">Select...</option>
              {q.options.map(opt => (
                <option key={opt} value={opt} style={{ background: "#111", color: "white" }}>
                  {opt}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-white" />
          </div>
        ) : (
          <input
            type={q.type || "text"}
            placeholder={q.placeholder}
            value={value}
            onChange={e => handleChange(q.id, e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />
        )}

        {/* Render sub-questions */}
        {showSub && questions
          .filter(sub => sub.dependsOn?.id === q.id)
          .map(renderQuestion)}
      </div>
    );
  };

  if (loading) return <p className="text-center text-white animate-pulse">Loading questions...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;
  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No questions available.</p>
        <button onClick={onBack} className="mt-4 text-orange-400 underline">Back</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-orange-400 capitalize">{category}</h2>
        <button onClick={onBack} className="text-sm text-gray-400 underline">Change</button>
      </div>

      {questions
        .filter(q => !q.dependsOn)
        .map(renderQuestion)}

      <button
        onClick={handleSubmit}
        disabled={!isComplete}
        className={`w-full mt-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all ${
          isComplete
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl hover:scale-105"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
      >
        Search Now
        <FiArrowRight />
      </button>
    </div>
  );
}