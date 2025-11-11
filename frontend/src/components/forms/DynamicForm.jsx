// src/components/forms/DynamicForm.jsx
import { useState, useEffect } from "react";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import { getQuestionnaire, matchLostItem } from "../../services/api";
import { useNavigate } from "react-router-dom"; // ← ADD THIS

export default function DynamicForm({ categoryId, categoryName, onBack }) {
  const navigate = useNavigate(); // ← ADD THIS

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!categoryId) return;

      setLoading(true);
      setError("");
      try {
        const res = await getQuestionnaire(categoryId);
        setQuestions(res.data.questions || []);
      } catch (err) {
        setError("Failed to load questions. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryId]);

  // Check form completion
  useEffect(() => {
    const topLevel = questions.filter(q => !q.dependsOn);
    const allFilled = topLevel.every(q => answers[q.id]?.trim());
    setIsComplete(allFilled);
  }, [answers, questions]);

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  // Submit → Navigate to Results
  const handleSubmit = async () => {
    if (!isComplete || !categoryId) return;

    try {
      const results = await matchLostItem({
        categoryId,
        claimantAnswers: answers,
      });

      navigate("/results", {
        state: {
          category: categoryName,
          totalMatches: results.data.totalMatches,
          details: results.data.details,
        },
      });
    } catch (err) {
      setError("No matches found or search failed.");
      console.error(err);
    }
  };

  const renderQuestion = (q) => {
    const value = answers[q.id] || "";
    const showSub = q.dependsOn && answers[q.dependsOn.id] === q.dependsOn.value;

    return (
      <div
        key={q.id}
        className={`space-y-2 ${q.dependsOn ? "ml-6 mt-4 border-l-2 border-orange-500/30 pl-4" : ""}`}
      >
        <label className="block text-white font-medium text-lg">{q.label}</label>

        {q.type === "select" ? (
          <div className="relative">
            <select
              value={value}
              onChange={(e) => handleChange(q.id, e.target.value)}
              className="w-full appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              <option value="">Select...</option>
              {q.options?.map((opt) => (
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
            placeholder={q.placeholder || `Enter ${q.label.toLowerCase()}`}
            value={value}
            onChange={(e) => handleChange(q.id, e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />
        )}

        {showSub &&
          questions
            .filter((sub) => sub.dependsOn?.id === q.id)
            .map(renderQuestion)}
      </div>
    );
  };

  // Loading
  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-white animate-pulse">Loading questions...</p>
      </div>
    );
  }

  // Error
  if (error && questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={onBack} className="text-orange-400 underline">
          Go Back
        </button>
      </div>
    );
  }

  // No questions
  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No questions available for this category.</p>
        <button onClick={onBack} className="mt-4 text-orange-400 underline">
          Change Category
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-orange-400 capitalize">
          {categoryName || "Item"}
        </h2>
        <button onClick={onBack} className="text-sm text-gray-400 underline hover:text-white">
          Change
        </button>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.filter((q) => !q.dependsOn).map(renderQuestion)}
      </div>

      {/* Error */}
      {error && <p className="text-red-400 text-center">{error}</p>}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!isComplete}
        className={`w-full mt-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all ${
          isComplete
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl hover:scale-105"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
      >
        Search for My Item
        <FiArrowRight />
      </button>
    </div>
  );
}