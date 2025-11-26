// src/pages/Lost.jsx
import { useState, useEffect } from "react";
import { FiSearch, FiArrowRight, FiHeadphones } from "react-icons/fi";
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

import { getCategories } from "../services/api";
import DynamicForm from "../components/forms/DynamicForm";
import { FaRegIdCard } from "react-icons/fa";

// Map DB icon string → actual component
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

export default function Lost() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const handleResults = (results) => {
    console.log("Match Results:", results);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black/95 flex items-center justify-center">
        <p className="text-white animate-pulse">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black/95 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black/95 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl">
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white mb-2">Find My Lost Item</h1>
            <p className="text-gray-400">Answer a few questions to search</p>
          </div>

          {!selectedCategory ? (
            <>
              <label className="block text-white font-medium mb-4 text-lg">Select Item Category</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const IconComponent = iconMap[cat.icon] || HelpCircle; // ← Fallback
                  return (
                    <button
                      key={cat._id}
                      onClick={() => handleSelectCategory(cat)}
                      className="p-6 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 hover:border-orange-500/50 transition-all group"
                    >
                      <div className="text-3xl mb-3 flex justify-center">
                        <IconComponent className="w-8 h-8 text-orange-400" />
                      </div>
                      <p className="text-white font-medium">{cat.name}</p>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <DynamicForm
              categoryId={selectedCategory._id}
              categoryName={selectedCategory.name}
              onSubmit={handleResults}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </section>
  );
}