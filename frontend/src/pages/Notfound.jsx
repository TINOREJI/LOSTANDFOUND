export default function NotFound() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-[#07090F] to-black flex items-center justify-center overflow-hidden px-6">

      {/* Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-orange-600/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      {/* Center Wrapper */}
      <div className="relative text-center max-w-xl w-full">

        {/* Glow */}
        <div className="absolute -inset-6 bg-gradient-to-r from-orange-500/20 via-transparent to-orange-600/20 blur-3xl rounded-3xl"></div>

        {/* Card */}
        <div className="relative  backdrop-blur-2xl p-10 rounded-3xl shadow-2xl">

          <h1 className="text-[120px] md:text-[150px] font-black bg-gradient-to-br from-orange-400 to-orange-600 text-transparent bg-clip-text leading-none">
            404
          </h1>

          <p className="text-gray-300 text-xl md:text-2xl mt-4 font-medium">
            Page Not Found
          </p>

          <a
            href="/"
            className="mt-8 inline-block px-10 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold text-lg shadow-lg"
          >
            Back to Home
          </a>
        </div>
      </div>
    </section>
  );
}
