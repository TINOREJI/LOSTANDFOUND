import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiLogIn } from "react-icons/fi";
import logo from "../../assets/logodemp.png";

export default function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      if (menuOpened && window.scrollY > 30) setMenuOpened(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpened]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/guidelines", label: "Guidelines" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl shadow-2xl py-3 border-b border-white/10"
            : "bg-black/90 backdrop-blur-lg py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 flex items-center justify-between">
          {/* Logo + Name (Left) */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img
              src={logo}
              alt="Findr Logo"
              className="h-8 w-8 object-contain hover:scale-105 transition-transform rounded-full aspect-square object-cover"
            />
            <span className="text-2xl font-bold text-white tracking-tight">Findr</span>
          </Link>

          {/* Center Nav (Perfectly Centered) */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-10 font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wider transition-all duration-200 hover:glow"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Login Button (Right) */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 from-orange-500 via-orange-600 to-orange-700 text-white px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpened(!menuOpened)}
            className="md:hidden text-white text-2xl hover:scale-110 transition-transform"
            aria-label="Toggle menu"
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {menuOpened && (
        <>
          <div className="fixed top-0 left-0 w-80 h-full bg-gradient-to-b from-black via-gray-900 to-black shadow-2xl z-50 transform transition-transform duration-300 translate-x-0 md:hidden border-r border-white/10">
            <div className="p-6">
              <button
                onClick={() => setMenuOpened(false)}
                className="text-white/80 mb-8 text-lg font-medium flex items-center space-x-2"
              >
                <span>×</span>
                <span>Close</span>
              </button>
              <nav className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpened(false)}
                    className="text-white hover:text-orange-400 font-medium text-lg py-3 border-b border-white/10 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={() => setMenuOpened(false)}
                  className="flex items-center space-x-2 text-white hover:text-orange-400 font-medium text-lg py-3 border-b border-white/10"
                >
                  <FiLogIn className="text-xl" />
                  <span>Login</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMenuOpened(false)}
          />
        </>
      )}

      {/* Glow Effect */}
      <style jsx>{`
        .hover\\:glow:hover {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  );
}