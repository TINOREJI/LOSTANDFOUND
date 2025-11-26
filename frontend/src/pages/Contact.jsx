// src/pages/Contact.jsx
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // "sending" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    // Simulate sending (replace with real API later)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // fake delay
      // await sendContactEmail(formData); // ← your future API call

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-black/95 py-16 px-4">
      <div className="max-w-5xl mx-auto mt-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-400">
            We’re here to help you 24/7
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

            {status === "success" ? (
              <div className="text-center py-12">
                <FiCheckCircle className="mx-auto text-7xl text-green-400 mb-4" />
                <p className="text-xl font-bold text-white">Thank You!</p>
                <p className="text-gray-400">We’ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Lost item inquiry"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-5 py-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-3 text-red-400 bg-red-500/10 px-4 py-3 rounded-xl">
                    <FiAlertCircle />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`w-full py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    status === "sending"
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:scale-105 shadow-xl"
                  }`}
                >
                  {status === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <FiSend />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/20 border border-orange-500/30 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <FiMail className="text-2xl text-orange-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Email us anytime</p>
                    <a
                      href="mailto:support@findr.app"
                      className="text-xl font-bold text-white hover:text-orange-300 transition-colors"
                    >
                      support@findr.app
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <FiPhone className="text-2xl text-orange-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Call us (24/7)</p>
                    <a
                      href="tel:+1234567890"
                      className="text-xl font-bold text-white hover:text-orange-300 transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <FiMapPin className="text-2xl text-orange-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Visit us</p>
                    <p className="text-xl font-bold text-white">
                      Campus Security Office<br />
                      Room 101, Main Building
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link to="/guidelines" className="block text-orange-400 hover:text-orange-300">
                  Community Guidelines
                </Link>
                <Link to="/faq" className="block text-orange-400 hover:text-orange-300">
                  Frequently Asked Questions
                </Link>
                <Link to="/guidelines" className="block text-orange-400 hover:text-orange-300">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back Home */}
        <div className="text-center mt-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 underline text-lg"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}