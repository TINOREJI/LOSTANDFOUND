// src/pages/SearchByPhoto.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { detectItemFromImage, getCategories } from "../services/api";
import { format } from "date-fns";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const YOLO_TO_CATEGORY_NAME = {
  phone: "Phone",
  wallet: "Wallet",
  bag: "Bag",
  laptop: "Laptop",
  earphone: "Earphones",
  glasses: "Glasses",
  charger: "Charger / Power Bank",
  bottle: "Water Bottle",
  key: "Keys",
  "id-card": "Student ID Card",
  "water-bottle": "Water Bottle",
  watch: "Watch",
  umbrella: "Umbrella",
  jacket: "Jacket",
  book: "Book",
};

export default function SearchByPhoto() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [detectedName, setDetectedName] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [loadingAI, setLoadingAI] = useState(false);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setDetectedName("");
    setResults([]);
    setError("");
    setLoadingAI(true);

    try {
      const aiResult = await detectItemFromImage(file);

      if (!aiResult.success || !aiResult.detected) {
        setError("AI could not detect any item. Try a clearer photo.");
        setLoadingAI(false);
        return;
      }

      const detectedClass = aiResult.detected.toLowerCase().replace(/\s+/g, "-");
      const categoryName = YOLO_TO_CATEGORY_NAME[detectedClass] || aiResult.detected;

      setDetectedName(categoryName);
      setConfidence(aiResult.confidence || 0);
      setLoadingAI(false);

      await searchByCategoryName(categoryName);
    } catch (err) {
      console.error("AI Error:", err);
      setError("AI server offline or image too large");
      setLoadingAI(false);
    }
  };

  const searchByCategoryName = async (detectedName) => {
  setSearching(true);
  setError("");
  try {
    // Step 1: Get all categories
    const catRes = await getCategories();
    const categories = catRes.data?.categories || catRes.categories || [];

    // Step 2: Find the category by name
    const category = categories.find(
      c => c.name.toLowerCase() === detectedName.toLowerCase()
    );

    if (!category) {
      setError(`"${detectedName}" not found in database`);
      setSearching(false);
      return;
    }

    // Step 3: Use category._id directly — FASTEST, SAFEST, SIMPLEST
    const res = await fetch(`${API_URL}/item/by-category/${category._id}`);
    const data = await res.json();

    setResults(data.details || []);
  } catch (err) {
    setError("Search failed");
  } finally {
    setSearching(false);
  }
};
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl animate-float-slow delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mt-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            Lost Something?<br />
            <span className="text-orange-500">Just Upload a Photo</span>
          </h1>
          <p className="text-2xl text-gray-400">AI finds it in seconds</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-lg text-gray-300 file:mr-6 file:py-10 file:px-16 file:rounded-3xl file:border-0 file:text-xl file:font-bold file:bg-orange-600 file:text-white hover:file:bg-orange-700 cursor-pointer"
          />

          {preview && (
            <div className="mt-12 text-center">
              <img src={preview} alt="Lost item" className="max-w-2xl mx-auto rounded-3xl border-4 border-white/20 shadow-2xl" />

              {loadingAI && (
                <div className="mt-12 p-10 bg-white/10 backdrop-blur-2xl rounded-3xl">
                  <p className="text-4xl font-black text-orange-400 animate-pulse">Analyzing with AI...</p>
                </div>
              )}

              {detectedName && !loadingAI && (
                <div className="mt-10 p-10 bg-gradient-to-br from-orange-600/20 to-orange-800/20 backdrop-blur-3xl rounded-3xl border border-orange-500/30">
                  <p className="text-6xl font-black text-orange-400 mb-3">Detected: {detectedName}</p>
                  <p className="text-3xl text-orange-300">Confidence: {(confidence * 100).toFixed(0)}%</p>
                </div>
              )}

              {error && <p className="mt-10 text-3xl text-red-400 font-bold">{error}</p>}

              {searching && (
                <p className="mt-16 text-4xl text-orange-400 animate-pulse">Searching campus database...</p>
              )}

              {/* RESULTS */}
              {!searching && results.length > 0 && (
                <div className="mt-20 animate-fadeIn">
                  <h2 className="text-center text-6xl font-black text-green-400 mb-16">
                    Found {results.length} match{results.length > 1 ? "es" : ""}!
                  </h2>
                  <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {results.map((match) => {
                      const { item, matchScore, details } = match;
                      const { description, location, photo, reportedAt, finderAnswers } = details;

                      return (
                        <div key={item} className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:border-orange-500/60 transition-all duration-500 hover:scale-[1.02]">
                          <div className="relative h-80 bg-black/50 overflow-hidden">
                            {photo ? (
                              <img src={`http://localhost:8000${photo}`} alt="Found" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-600 text-4xl">No Photo</div>
                            )}
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-black text-2xl shadow-2xl animate-pulse">
                              {matchScore}% Match
                            </div>
                          </div>

                          <div className="p-8 space-y-5">
                            <h3 className="text-2xl font-bold text-white line-clamp-2">{description || "No description"}</h3>
                            <div className="space-y-3 text-gray-300">
                              <p><span className="text-orange-400 font-bold">Location:</span> {location}</p>
                              <p className="text-sm">Found on <span className="text-orange-300">{format(new Date(reportedAt), "MMM d, yyyy 'at' h:mm a")}</span></p>
                            </div>

                            {finderAnswers && Object.keys(finderAnswers).length > 0 && (
                              <div className="pt-4 border-t border-white/20">
                                <p className="text-sm text-gray-400 mb-3">Additional Info:</p>
                                <div className="flex flex-wrap gap-2">
                                  {Object.entries(finderAnswers).map(([k, v]) => (
                                    <span key={k} className="px-4 py-2 bg-orange-600/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30">
                                      {k.replace(/_/g, " ")}: <strong>{v}</strong>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => navigate(`/item/${item}`, { state: { matchScore, detectedName } })}
                              className="w-full mt-6 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xl shadow-xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
                            >
                              View Details & Claim
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {!searching && results.length === 0 && detectedName && (
                <div className="mt-20 text-center">
                  <p className="text-4xl text-gray-400">
                    No matches found yet.<br />
                    <span className="text-orange-400 text-5xl font-black">Be the first to report it!</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .delay-1000 { animation-delay: 1s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}