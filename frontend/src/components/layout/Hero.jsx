// src/pages/Hero.jsx — ULTRA PREMIUM GLASSMORPHISM EDITION
import { Link } from "react-router-dom";
import pagePhoto from "../../assets/homepage.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-32 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-float delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-float delay-2000" />
      </div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Text + CTA */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Lost Something
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  on Campus?
                </span>
              </h1>

              <p className="text-sm md:text-ms text-gray-300 font-medium max-w-4xl mx-auto lg:mx-0">
                Report found items in seconds. Search thousands of lost belongings.
                <span className="text-orange-400 font-bold"> Get it back fast.</span>
              </p>
            </div>

            {/* CTA Buttons with Glass Effect */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link
                to="/found"
                className="group relative px-10 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-orange-500/60 transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Report Found Item
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 blur-xl scale-0 group-hover:scale-150 transition-transform duration-700" />
              </Link>

              <Link
                to="/lost"
                className="px-10 py-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold text-xl rounded-2xl hover:bg-white/20 hover:border-white/40 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Search Lost Items
              </Link>
            </div>
          </div>

          {/* Right: Floating Glass Card */}
          <div className="relative flex justify-center lg:justify-end">
  <div className="relative group">
    {/* Outer glow */}
    <div className="absolute -inset-6 bg-gradient-to-r from-orange-600/40 via-transparent to-purple-600/30 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-1000" />

    {/* Main Glass Card + Floating Animation */}
    <div className="transform hover:scale-105 hover:rotate-3 transition-all duration-700 animate-float-slow">
      {/* Inner shine (optional, kept for glass feel) */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br pointer-events-none" />
      
      <div className="relative z-10 flex justify-center px-8 py-12">
        <img
          src={pagePhoto}
          alt="Findr Detective"
          className="w-full max-w-sm h-auto object-contain drop-shadow-2xl 
                     [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.4))]
                     mix-blend-plus-lighter 
                     hover:mix-blend-normal 
                     transition-all duration-700"
          draggable="false"
        />
      </div>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Enhanced Glassmorphism Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }

        .backdrop-blur-2xl {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
          @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}