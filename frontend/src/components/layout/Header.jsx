import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiLogIn } from "react-icons/fi";
import { 
  SignedIn, 
  SignedOut, 
  UserButton, 
  useUser 
} from "@clerk/clerk-react";
import logo from "../../assets/logodemp.png";

export default function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser(); // Get user data (optional for name/avatar)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      if (menuOpened && window.scrollY > 30) setMenuOpened(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpened]);

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/search-by-photo", label: "SEARCH BY PHOTO" },
    { to: "/guidelines", label: "GUIDELINES" },
    { to: "/contact", label: "CONTACT US" },
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-xl shadow-2xl" : "bg-gradient-to-b from-black/60 to-transparent backdrop-blur-md py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img
              src={logo}
              alt="Findr Logo"
              className="h-10 w-10 object-contain hover:scale-105 transition-transform rounded-full"
            />
            <span className="text-2xl font-bold text-white tracking-tight">Findr</span>
          </Link>

          {/* Center Nav */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-12 font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-400 hover:text-white font-bold text-base tracking-wider transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side: Login or Profile */}
          <div className="hidden md:flex items-center">
            <SignedOut>
              <Link
                to="/sign-in"
                className="flex items-center space-x-2 
                           bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 
                           text-white px-6 py-3 rounded-full font-bold text-sm 
                           transition-all duration-300 group shadow-lg"
              >
                <span>Login</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-3">
                {user?.firstName && (
                  <span className="text-white font-medium text-sm hidden lg:block">
                    Hi, {user.firstName}!
                  </span>
                )}
                {/* Clerk User Button - Beautiful Avatar Dropdown */}
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-11 h-11 ring-2 ring-orange-500/50 ring-offset-2 ring-offset-black hover:ring-orange-400 transition-all",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpened(!menuOpened)}
            className="md:hidden text-white text-3xl hover:scale-110 transition-transform"
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {menuOpened && (
        <>
          <div className="fixed top-0 left-0 w-80 h-full bg-gradient-to-b from-black/95 via-gray-900/95 to-black/95 backdrop-blur-2xl shadow-2xl z-50 transform transition-transform duration-300 translate-x-0 md:hidden border-r border-white/10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-10">
                <Link to="/" className="flex items-center space-x-2" onClick={() => setMenuOpened(false)}>
                  <img src={logo} alt="Findr" className="h-10 w-10 rounded-full" />
                  <span className="text-2xl font-bold text-white">Findr</span>
                </Link>
                <button
                  onClick={() => setMenuOpened(false)}
                  className="text-white text-3xl hover:text-orange-400"
                >
                  ×
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
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

                <SignedOut>
                  <Link
                    to="/sign-in"
                    onClick={() => setMenuOpened(false)}
                    className="flex items-center space-x-3 text-white hover:text-orange-400 font-medium text-xl py-3"
                  >
                    <FiLogIn className="text-xl" />
                    <span>Login</span>
                  </Link>
                </SignedOut>

                <SignedIn>
                  <div className="py-4 border-b border-white/10">
                    <div className="flex items-center space-x-4">
                      <UserButton />
                      <div>
                        <p className="text-white font-medium">
                          {user?.firstName || "User"}
                        </p>
                        <p className="text-gray-400 text-sm">{user?.emailAddresses[0]?.emailAddress}</p>
                      </div>
                    </div>
                  </div>
                </SignedIn>
              </nav>
            </div>
          </div>

          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-40 md:hidden"
            onClick={() => setMenuOpened(false)}
          />
        </>
      )}
    </>
  );
}