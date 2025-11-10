// src/pages/Hero.jsx
import { Link } from "react-router-dom";
import pagePhoto from "../../assets/logodemp.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black/95 overflow-hidden flex items-center">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-25%] right-[-20%] w-[600px] h-[600px] bg-gray-700/20 rounded-full blur-3xl animate-pulse-slow delay-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text + CTA */}
          <div className="text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-2xl animate-fade-in-up">
              Lost Something on <br />
              <span className="text-orange-400 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                Campus?
              </span>
            </h1>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 animate-fade-in-up delay-100">
              We’ll Help You <span className="text-white">Find It</span>
            </h2>

            <p className="text-gray-400 text-md leading-relaxed max-w-4xl mx-auto lg:mx-0 animate-fade-in-up delay-200">
              Report found items instantly or search thousands of lost belongings. 
              Fast. Simple. Secure.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-8 animate-fade-in-up delay-300">
              {/* Primary CTA */}
              <Link
                to="/found"
                className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-orange-400/50 glow-button"
              >
                Report Found Item
                <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Secondary CTA */}
              <Link
                to="/lost"
                className="inline-flex items-center justify-center px-10 py-5 border-2 border-white/40 text-white font-semibold text-lg rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/60 transform hover:scale-105 transition-all duration-300 glow-border"
              >
                Search Lost Items
              </Link>
            </div>
          </div>

          {/* Right: Floating Image Card */}
          <div className="flex justify-center lg:justify-end perspective-1000">
            <div className="relative group animate-fade-in-right">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-transparent rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-black/50 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl transform hover:rotate-1 hover:scale-105 transition-all duration-500">
                <div className="rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={pagePhoto}
                    alt="Findr - Lost & Found"
                    className="w-full h-auto object-cover max-w-md mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
        .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite; }
        .delay-700 { animation-delay: 0.7s; }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.9s ease-out forwards; }

        @keyframes fade-in-right {
          0% { opacity: 0; transform: translateX(50px) rotateY(15deg); }
          100% { opacity: 1; transform: translateX(0) rotateY(0); }
        }
        .animate-fade-in-right { animation: fade-in-right 1s ease-out forwards; }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }

        .glow-button:hover {
          box-shadow: 0 0 30px rgba(249, 115, 22, 0.7), 0 0 60px rgba(249, 115, 22, 0.4);
        }
        .glow-border:hover {
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}