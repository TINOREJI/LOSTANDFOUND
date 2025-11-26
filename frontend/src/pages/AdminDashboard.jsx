// src/pages/AdminDashboard.jsx — FINAL, 100% WORKING WITH YOUR BACKEND
import { SignedIn, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, available: 0, reunited: 0 });
  const [loading, setLoading] = useState(true);

  // CHANGE THIS TO YOUR EMAIL
  const ADMIN_EMAIL = "checkerproject2@gmail.com";

  useEffect(() => {
    if (!isLoaded || !user) return;

    const isAdmin = user.emailAddresses?.[0]?.emailAddress === ADMIN_EMAIL;
    if (!isAdmin) return;

    const fetchAllItems = async () => {
      try {
        const res = await fetch(`${API_URL}/item`);
        const json = await res.json();

        if (!json.success || !json.data?.items) {
          throw new Error("Invalid response");
        }

        const allItems = json.data.items;

        const available = allItems.filter(i => i.status === "found").length;
        const reunited = allItems.filter(i => i.status === "claimed").length;

        setItems(allItems);
        setStats({
          total: allItems.length,
          available,
          reunited,
        });
      } catch (err) {
        console.error("Failed to load items:", err);
        alert("Backend error. Check console.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllItems();
  }, [user, isLoaded]);

  if (!isLoaded || !user) return null;

  const isAdmin = user.emailAddresses?.[0]?.emailAddress === ADMIN_EMAIL;
  if (!isAdmin) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <h1 className="text-6xl font-black text-orange-500">403</h1>
      </div>
    );
  }

  return (
    <SignedIn>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background Orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl animate-float-slow delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12 mt-16">
          <h1 className="text-5xl md:text-7xl font-black mb-12">
            Admin <span className="text-orange-500">Dashboard</span>
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-10 text-center hover:scale-105 transition-all">
              <div className="text-6xl font-black text-orange-400">{stats.total}</div>
              <p className="text-xl text-gray-400 mt-4">Total Items</p>
            </div>
            <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-10 text-center hover:scale-105 transition-all">
              <div className="text-6xl font-black text-green-400">{stats.available}</div>
              <p className="text-xl text-gray-400 mt-4">Available</p>
            </div>
            <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-10 text-center hover:scale-105 transition-all">
              <div className="text-6xl font-black text-blue-400">{stats.reunited}</div>
              <p className="text-xl text-gray-400 mt-4">Reunited</p>
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-10">
            <h2 className="text-4xl font-black mb-8">All Found Items</h2>
            {loading ? (
              <p className="text-center text-gray-400 py-20">Loading items...</p>
            ) : items.length === 0 ? (
              <p className="text-center text-gray-400 py-20">No items found</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all"
                  >
                    <div className="flex gap-6">
                      {item.photo && (
                        <img
                          src={`${API_URL}${item.photo}`}
                          alt="item"
                          className="w-24 h-24 rounded-xl object-cover border border-white/20"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-white">{item.description}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {item.category?.name} • {format(new Date(item.reportedAt), "MMM d, yyyy")}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">{item.location}</p>
                        <div className="mt-4">
                          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                            item.status === "claimed"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                              : "bg-green-500/20 text-green-400 border border-green-500/50"
                          }`}>
                            {item.status === "claimed" ? "Reunited" : "Available"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
          }
          .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
          .delay-1000 { animation-delay: 1s; }
        `}</style>
      </div>
    </SignedIn>
  );
}