// src/pages/ItemDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { getItemById, claimItem } from "../services/api";
import { useLocation } from "react-router-dom"; 

export default function ItemDetail() {
  const { id } = useParams();
  const location = useLocation();                 
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [claiming, setClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [claimError, setClaimError] = useState("");
  const urlMatchScore = location.state?.matchScore || 0;
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await getItemById(id);
        setItem(res.data.item);
      } catch (err) {
        setError("Item not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id]);
  const displayScore = urlMatchScore;
  const handleClaim = async () => {
    setClaiming(true);
    setClaimError("");

    try {
      await claimItem(id);
      setClaimSuccess(true);
    } catch (err) {
      setClaimError(err.message || "Failed to submit claim.");
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black/95 flex items-center justify-center">
        <p className="text-white animate-pulse">Loading item...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-black/95 flex items-center justify-center text-center">
        <div>
          <p className="text-red-400 mb-4">{error || "Item not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="text-orange-400 underline hover:text-orange-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { description, place, photo, reportedAt, finderAnswers } = item;

  return (
    <section className="min-h-screen bg-black/95 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-orange-400 hover:text-orange-300"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image + Score */}
            <div className="relative h-96 md:h-full">
              {photo ? (
                <img
                  src={`http://localhost:8000${photo}`}
                  alt="Found item"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-500 text-xl">No Photo</span>
                </div>
              )}
              <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md px-6 py-3 rounded-2xl">
                <p className="text-4xl font-black text-white">{displayScore}%</p>
                <p className="text-sm text-gray-300">Match Score</p>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12 space-y-8">
              <div>
                <h1 className="text-3xl font-black text-white mb-3">{description}</h1>
                <div className="flex items-center gap-3 text-gray-400">
                  <FiMapPin className="text-orange-400" />
                  <span>{place}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 mt-2">
                  <FiCalendar className="text-orange-400" />
                  <span>{new Date(reportedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Finder Answers */}
              {finderAnswers && Object.keys(finderAnswers).length > 0 && (
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-orange-400 mb-4">Item Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(finderAnswers).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-gray-400 capitalize">{key.replace(/_/g, " ")}:</span>
                        <span className="text-white ml-2">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Claim Section */}
              <div className="pt-6 border-t border-white/10">
                {claimSuccess ? (
                  <div className="text-center py-8">
                    <FiCheckCircle className="mx-auto text-7xl text-green-400 mb-4" />
                    <p className="text-2xl font-bold text-white">Claim Submitted!</p>
                    <p className="text-gray-400 mt-2">The finder will be notified.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white mb-4">Is this your item?</h3>
                    <button
                      onClick={handleClaim}
                      disabled={claiming}
                      className={`w-full py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                        claiming
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:scale-105 shadow-xl"
                      }`}
                    >
                      {claiming ? "Submitting Claim..." : "Yes, Claim This Item"}
                    </button>
                    {claimError && <p className="text-red-400 text-center mt-4">{claimError}</p>}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}