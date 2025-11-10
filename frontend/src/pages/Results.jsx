// src/pages/Results.jsx
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiArrowLeft, FiMapPin, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { getItemById } from "../services/api";

export default function Results() {
  const location = useLocation();
  const { results = [], category } = location.state || {};
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      if (!results || results.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const promises = results.map((id) => getItemById(id));
        const detailedItems = await Promise.all(promises);
        setItems(detailedItems);
      } catch (err) {
        setError("Failed to load item details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [results]);

  if (loading) {
    return (
      <section className="min-h-screen bg-black/95 flex items-center justify-center px-4">
        <div className="text-white text-lg animate-pulse">Searching for matches...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-black/95 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Link to="/lost" className="text-orange-400 underline">Try Again</Link>
        </div>
      </section>
    );
  }

  if (!results || results.length === 0) {
    return (
      <section className="min-h-screen bg-black/95 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full flex items-center justify-center">
              <FiCheckCircle className="text-4xl text-gray-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Matches Found</h2>
          <p className="text-gray-400 mb-8">
            We couldn't find any items matching your description.
          </p>
          <Link
            to="/lost"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-500 transition-all"
          >
            <FiArrowLeft /> Try Different Answers
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black/95 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-2">
            {items.length} Match{items.length > 1 ? "es" : ""} Found
          </h1>
          <p className="text-gray-400">Category: <span className="capitalize text-orange-400">{category}</span></p>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.description}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium bg-orange-600/80 px-3 py-1 rounded-full inline-block">
                    {item.matchScore}% Match
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white capitalize">{item.category}</h3>
                <p className="text-gray-300 line-clamp-2">{item.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <FiMapPin />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiCalendar />
                    <span>{new Date(item.foundAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <Link
                  to={`/item/${item._id}`}
                  className="block w-full mt-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-center rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link
            to="/lost"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
          >
            <FiArrowLeft /> Search Again
          </Link>
        </div>
      </div>
    </section>
  );
}