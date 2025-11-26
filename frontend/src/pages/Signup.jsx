import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-[#07090F] to-black overflow-hidden flex items-center justify-center px-6">

      {/* Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-10 w-80 h-80 bg-orange-600/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      {/* CENTER WRAPPER */}
      <div className="relative w-full max-w-md mx-auto mt-16">

        {/* Glow Behind Form */}
        <div className="absolute -inset-6 bg-gradient-to-r from-orange-500/20 via-transparent to-orange-600/20 blur-3xl rounded-3xl"></div>

        {/* Signup Card */}
        <div className="relative bg-black/40 border border-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl">

          <h2 className="text-white text-3xl font-semibold mb-6 text-center">
            Create Your Account
          </h2>

          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            afterSignUpUrl="/"
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-all",
                card: "bg-transparent shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
              },
            }}
          />

          {/* Text Link Below */}
          <p className="text-gray-300 text-sm text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-all"
            >
              Log In
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
}
