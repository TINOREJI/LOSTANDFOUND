import logo from '../../assets/logodemp.png';
export default function Footer() {
  return (
    <footer className="bg-black/95 backdrop-blur-xl border-t border-white/10 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          {/* Left: Logo + Name */}
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Findr Logo"
              className="h-8 w-8 object-contain rounded-full aspect-square object-cover"
            />
            <span className="text-xl font-bold text-white tracking-tight">Findr</span>
          </div>

          {/* Center: Links */}
          <p className="text-xs text-gray-500">
            © 2025 Findr. All rights reserved.
          </p>

          {/* Right: Copyright */}
          <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors hover:glow">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors hover:glow">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors hover:glow">
              Contact Us
            </a>
          </nav>
        </div>
      </div>

      {/* Glow Effect (same as Header) */}
      <style jsx>{`
        .hover\\:glow:hover {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </footer>
  );
}