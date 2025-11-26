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
    { to: "/", label: "HOME" }, // Changed to uppercase to match screenshot
    { to: "/guidelines", label: "GUIDELINES" }, // Changed to uppercase to match screenshot
    { to: "/contact", label: "CONTACT US" }, // Changed to uppercase to match screenshot
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? ""
            : "bg-gradient-to-b backdrop-blur-md py-4" 
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo + Name (Left) */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img
              src={logo}
              alt="Findr Logo"
              className="h-10 w-10 object-contain hover:scale-105 transition-transform rounded-full aspect-square object-cover" 
            />
            <span className="text-2xl font-bold text-white tracking-tight">Findr</span>
          </Link>

          {/* Center Nav (Perfectly Centered) */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-12 font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-500 hover:text-white font-bold text-base tracking-wider transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Login Button (Right) - Reverted to Screenshot Style */}
          <div className="hidden md:flex items-center">
            <Link
              to="/sign-in"
              className="flex items-center space-x-2 
                         bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 
                         text-white px-4 py-2 rounded-full font-bold text-sm 
                         transition-all duration-200 group" 
            >
              <span className="relative z-10">Login</span>
              <span className="relative z-10 text-xl">→</span> 
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpened(!menuOpened)}
            className="md:hidden text-white text-3xl hover:scale-110 transition-transform"
            aria-label="Toggle menu"
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {/* ... (Keep mobile sidebar styling as is, it's not visible in the hero) */}
      {menuOpened && (
        <>
          <div className="fixed top-0 left-0 w-80 h-full 
                          bg-gradient-to-b from-black/90 via-gray-900/90 to-black/90 
                          backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 
                          translate-x-0 md:hidden border-r border-white/10" 
          >
            {/* ... (Mobile nav links) */}
            <div className="p-6">
              {/* ... (close button) */}
              <nav className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpened(false)}
                    className="text-white hover:text-orange-400 font-medium text-xl py-3 border-b border-white/10 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/sign-in"
                  onClick={() => setMenuOpened(false)}
                  className="flex items-center space-x-3 text-white hover:text-orange-400 font-medium text-xl py-3"
                >
                  <FiLogIn className="text-xl" />
                  <span>Login</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-40 md:hidden"
            onClick={() => setMenuOpened(false)}
          />
        </>
      )}

      {/* Removed custom glow style as it's not present on the links in the screenshot */}
    </>
  );
}