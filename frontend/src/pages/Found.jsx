// src/pages/Found.jsx
import { useState, useEffect } from "react";
import { FiUpload, FiX, FiChevronDown, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { getCategories, getQuestionnaire, submitFoundItem } from "../services/api";
import {
  Smartphone,
  Wallet,
  Key,
  Laptop,
  Package,
  HelpCircle,
  CreditCard,
  Watch,
  Headphones,
  BookOpen,
  Umbrella,
  Shirt,
  Glasses,
} from "lucide-react";
import { SlHandbag } from "react-icons/sl";
import { IoBookOutline } from "react-icons/io5";
import { IoGlassesOutline } from "react-icons/io5";
import { SlEarphones } from "react-icons/sl";
import { GiSleevelessJacket } from "react-icons/gi";
import { IoIosLaptop } from "react-icons/io";
import { CiWallet } from "react-icons/ci";
import { FaBottleWater } from "react-icons/fa6";
import { FaRegIdCard } from "react-icons/fa";

export default function Found() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories from DB
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.categories || []);
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch questions when category changes
  useEffect(() => {
    if (selectedCategory) {
      const fetchQuestions = async () => {
        setLoading(true);
        try {
          const res = await getQuestionnaire(selectedCategory._id);
          setQuestions(res.data.questions || []);
        } catch (err) {
          setError("Failed to load questions.");
        } finally {
          setLoading(false);
        }
      };
      fetchQuestions();
    }
  }, [selectedCategory]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
  };

  const handleAnswer = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const isFormValid =
    selectedCategory &&
    description.trim() &&
    location.trim() &&
    image &&
    questions.filter(q => !q.dependsOn).every(q => answers[q.id]?.trim());

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setUploading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("category", selectedCategory._id); // ← Real _id
    formData.append("description", description);
    formData.append("location", location);
    formData.append("photo", image);

    // Append each answer as separate field
    Object.entries(answers).forEach(([key, value]) => {
      if (value?.trim()) {
        formData.append(`finderAnswers[${key}]`, value);
      }
    });

    try {
      await submitFoundItem(formData);
      setSuccess(true);
      resetForm();
    } catch (err) {
      setError(err.message || "Failed to submit. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setDescription("");
    setLocation("");
    setAnswers({});
    setImage(null);
    setPreview("");
  };
const iconMap = {
  Smartphone: Smartphone,
  Wallet: Wallet,
  Key: Key,
  Laptop: Laptop,
  Package: Package,
  HelpCircle: HelpCircle,
  CreditCard: CreditCard,
  Watch: Watch,
  Headphones: Headphones,
  Book: BookOpen,
  Umbrella: Umbrella,
  Shirt: Shirt,
  Glasses: Glasses,
  Bottle: FaBottleWater,
  Card:FaRegIdCard,
};

  const renderQuestion = (q) => {
    const value = answers[q.id] || "";
    const showSub = q.dependsOn && answers[q.dependsOn.id] === q.dependsOn.value;

    return (
      <div key={q.id} className={q.dependsOn ? "ml-6 mt-4 border-l-2 border-orange-500/30 pl-4" : "space-y-2"}>
        <label className="block text-white font-medium text-lg">{q.label}</label>

        {q.type === "select" ? (
          <div className="relative">
            <select
              value={value}
              onChange={e => handleAnswer(q.id, e.target.value)}
              className="w-full appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-5 py-4 pr-12 focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select...</option>
              {q.options?.map(opt => (
                <option key={opt} value={opt} style={{ background: "#111", color: "white" }}>
                  {opt}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-white" />
          </div>
        ) : (
          <input
            type="text"
            placeholder={q.placeholder || `Enter ${q.label.toLowerCase()}`}
            value={value}
            onChange={e => handleAnswer(q.id, e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-5 py-4 focus:ring-2 focus:ring-orange-500"
          />
        )}

        {showSub && questions
          .filter(sub => sub.dependsOn?.id === q.id)
          .map(renderQuestion)}
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-black/95 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl">
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white mb-2">Report Found Item</h1>
            <p className="text-gray-400">Help someone get their item back</p>
          </div>

          {success ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <FiCheckCircle className="text-5xl text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
              <p className="text-gray-400 mb-6">Item reported successfully.</p>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-500 transition-all"
              >
                Report Another Item
              </button>
            </div>
          ) : (
            <>
              {/* Category */}
          <div className="mb-8">
            <label className="block text-white font-medium mb-3">Item Category *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {loading ? (
                <p className="text-center text-white col-span-full">Loading categories...</p>
              ) : categories.length === 0 ? (
                <p className="text-center text-red-400 col-span-full">No categories available.</p>
              ) : (
                categories.map(cat => {
                  const IconComponent = iconMap[cat.icon] || HelpCircle;
                  return (
                    <button
                      key={cat._id}
                      onClick={() => setSelectedCategory(cat)}
                      className={`p-6 rounded-2xl border transition-all ${
                        selectedCategory?._id === cat._id
                          ? "bg-orange-600/20 border-orange-500 text-orange-400"
                          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      }`}
                    >
                      <div className="text-3xl mb-2 flex justify-center">
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <p className="font-medium">{cat.name}</p>
                    </button>
                  );
                })
              )}
            </div>

            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="mt-3 text-sm text-gray-400 underline hover:text-white"
              >
                Change Category
              </button>
            )}
          </div>

              {/* Image Upload */}
              <div className="mb-8">
                <label className="block text-white font-medium mb-3">Photo of Item *</label>
                {!preview ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-white/20 border-dashed rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all">
                    <FiUpload className="text-4xl text-gray-400 mb-3" />
                    <p className="text-gray-400">Click to upload (JPG, PNG)</p>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden">
                    <img src={preview} alt="Preview" className="w-full h-64 object-contain" />
                    <button
                      onClick={removeImage}
                      className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full hover:bg-black"
                    >
                      <FiX />
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <label className="block text-white font-medium mb-3">Description *</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="e.g. Black iPhone with cracked screen"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-5 py-4 h-28 focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              {/* Location */}
              <div className="mb-8">
                <label className="block text-white font-medium mb-3">Where was it found? *</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g. Library, 2nd Floor"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-5 py-4 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Dynamic Questions */}
              {selectedCategory && (
                <>
                  {loading ? (
                    <p className="text-center text-white">Loading questions...</p>
                  ) : questions.length > 0 ? (
                    <div className="space-y-6">
                      {questions.filter(q => !q.dependsOn).map(renderQuestion)}
                    </div>
                  ) : null}
                </>
              )}

              {error && <p className="text-red-400 text-center mt-4">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={!isFormValid || uploading}
                className={`w-full mt-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  isFormValid && !uploading
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl hover:scale-105"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                {uploading ? "Submitting..." : "Submit Found Item"}
                {!uploading && <FiArrowRight />}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}