// src/pages/ItemDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiCalendar, FiUser, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { getItemById, claimItem } from "../services/api";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [claiming, setClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [claimError, setClaimError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItemById(id);
        setItem(data);
      } catch (err) {
        setError("Failed to load item. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id]);

  const handleClaim = async () => {
    setClaiming(true);
    setClaimError("");
    setClaimSuccess(false);

    try {
      // Optional: Add claimant name/phone
      const claimantData = {
        name: "John Doe", // Replace with form input later
        phone: "+1234567890",
      };

      await claimItem(id, claimantData);
      setClaimSuccess(true);
    } catch (err) {
      setClaimError(err.message || "Claim failed. Try again.");
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-black/95 flex items-center justify-center px-4">
        <div className="text-white text-lg animate-pulse">Loading item...</div>
      </section>
    );
  }

  if (error || !item) {
    return (
      <section className="min-h-screen bg-black/95 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || "Item not found"}</p>
          <Link to="/results" className="text-orange-400 underline">Back to Results</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black/95 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/results"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-8 transition-colors"
        >
          <FiArrowLeft /> Back to Results
        </Link>

        {/* Main Card */}
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-96 md:h-full overflow-hidden">
              <img
                src={item.image || "/placeholder.jpg"}
                alt={item.description}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-3xl font-black">{item.matchScore}% Match</p>
                <p className="text-sm text-gray-300">Confidence Score</p>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12 space-y-8">
              <div>
                <h1 className="text-4xl font-black text-white capitalize mb-2">
                  {item.category}
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed">{item.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiMapPin className="text-orange-400" />
                  <span className="font-medium">Found at: {item.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FiCalendar className="text-orange-400" />
                  <span className="font-medium">
                    Found on: {new Date(item.foundAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FiUser className="text-orange-400" />
                  <span className="font-medium">Reported by: {item.reporterName || "Anonymous"}</span>
                </div>
              </div>

              {/* Claim Section */}
              <div className="pt-6 border-t border-white/10">
                {claimSuccess ? (
                  <div className="text-center py-6">
                    <FiCheckCircle className="mx-auto text-6xl text-green-400 mb-4" />
                    <p className="text-xl font-bold text-white">Claim Submitted!</p>
                    <p className="text-gray-400">We’ll contact you soon.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white mb-4">Is this your item?</h3>
                    <button
                      onClick={handleClaim}
                      disabled={claiming}
                      className="w-full py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {claiming ? (
                        "Submitting..."
                      ) : (
                        <>
                          Claim This Item
                          <FiCheckCircle className="text-xl" />
                        </>
                      )}
                    </button>
                    {claimError && (
                      <p className="text-red-400 text-sm mt-3 text-center">{claimError}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Need help? Contact support at <span className="text-orange-400">support@findr.app</span></p>
        </div>
      </div>
    </section>
  );
}