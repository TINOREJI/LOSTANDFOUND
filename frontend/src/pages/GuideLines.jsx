// src/pages/Guidelines.jsx
import { FiCheckCircle, FiAlertCircle, FiInfo, FiShield, FiPhone, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Guidelines() {
  return (
    <section className="min-h-screen bg-black/95 py-16 px-4">
      <div className="max-w-4xl mx-auto mt-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            Community Guidelines
          </h1>
          <p className="text-xl text-gray-400">
            Help us keep Findr safe, honest, and helpful for everyone
          </p>
        </div>

        <div className="space-y-12">
          {/* Be Honest */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FiCheckCircle className="text-3xl text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Be Honest & Accurate</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    Provide truthful and detailed information when reporting found or lost items
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    Only claim items that genuinely belong to you
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    False claims may result in account suspension
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Respect Privacy */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FiShield className="text-3xl text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Respect Privacy</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    Do not share personal contact information publicly
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    All communication goes through our secure claim system
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    We never share your phone or email without consent
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* No Scams */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FiAlertCircle className="text-3xl text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">No Scams or Fraud</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    Never ask for money, gifts, or favors to return an item
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    Do not create fake listings
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    Report suspicious activity immediately
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Be Kind */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FiInfo className="text-3xl text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Be Kind & Patient</h2>
                <p className="text-gray-300 leading-relaxed">
                  Everyone here is trying to help. Respond promptly when contacted about a claim.
                  A little kindness goes a long way in getting items back to their owners.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-3xl p-10">
            <h2 className="text-3xl font-black text-white mb-4">
              Questions or Concerns?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our team is here to help 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:treji_me25@gmail.com"
                className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 px-8 py-4 rounded-full font-bold text-white transition-all"
              >
                <FiMail /> treji_me25@gmail.com
              </a>
              <a
                href="tel:+91-884*******"
                className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 px-8 py-4 rounded-full font-bold text-white transition-all"
              >
                <FiPhone /> +91-884*******
              </a>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="text-orange-400 hover:text-orange-300 underline text-lg"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}