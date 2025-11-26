// src/pages/Results.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { claimItem } from "../services/api";
import { useState } from "react";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, totalMatches, details = [] } = location.state || {};

  const [claiming, setClaiming] = useState(null);
  const [claimed, setClaimed] = useState(null);
  const [error, setError] = useState("");

  const handleClaim = async (itemId) => {
    
  };

  if (!category || totalMatches === undefined) {
    return (
      <div className="min-h-screen bg-black/95 flex items-center justify-center">
        <p className="text-red-400">No results found. Go back and search again.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black/95 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-2">Search Results</h1>
          <p className="text-gray-400">
            Found <span className="text-orange-400 font-bold">{totalMatches}</span> possible match{totalMatches !== 1 ? "es" : ""} for your{" "}
            <span className="capitalize">{category}</span>
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 underline"
          >
            <FiArrowLeft /> Back to Search
          </button>
        </div>

        {/* No Matches */}
        {totalMatches === 0 ? (
          <div className="text-center py-20">
            <FiXCircle className="mx-auto text-6xl text-gray-600 mb-4" />
            <p className="text-xl text-gray-400">No matches found.</p>
            <p className="text-gray-500 mt-2">Try adjusting your answers or report it as lost.</p>
          </div>
        ) : (
          /* Matches Grid */
          <div className="grid md:grid-cols-2 gap-6">
            {details.map((match) => {
              const { item, matchScore, details } = match;
              const { description, location, photo, reportedAt } = details;

              return (
                <div
                  key={item}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-orange-500/50 transition-all"
                >
                  {/* Image */}
                  <div className="h-48 bg-gray-900 relative overflow-hidden">
                    {photo ? (
                      <img
                        src={`http://localhost:8000${photo}`}
                        alt="Found item"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-600">
                        <FiXCircle className="text-4xl" />
                      </div>
                    )}
                    {/* Match Badge */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {matchScore}% Match
                    </div>
                  </div>

                  {/* Content */}
                  {/* Content */}
                <div className="p-6 space-y-3">
                  <p className="text-white font-medium line-clamp-2">{description}</p>
                  <p className="text-sm text-gray-400">
                    Found at: <span className="text-orange-400">{location}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Reported: {new Date(reportedAt).toLocaleDateString()}
                  </p>

                  {/* Updated Button – Only navigation */}
                  <button
                  onClick={() =>
                    navigate(`/item/${item}`, {
                      state: { matchScore }  // ← SEND THE SCORE!
                    })
                  }
                  className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:scale-105 shadow-xl transition-all"
                >
                  View Details & Claim
                </button>
                </div>
                </div>
              );
            })}
          </div>
        )}

        {error && <p className="text-red-400 text-center mt-6">{error}</p>}
      </div>
    </section>
  );
}