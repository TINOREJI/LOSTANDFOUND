import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import LostPage from "./pages/LostPage";
import Found from "./pages/Found";
import Results from "./pages/Results";
import ItemDetail from "./pages/ItemDetails";
import GuideLines from "./pages/GuideLines";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/Notfound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guidelines" element={<GuideLines />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route
              path="/found"
              element={
                <>
                  <SignedIn>
                    <Found />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-in" replace />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/lost"
              element={
                <>
                  <SignedIn>
                    <LostPage />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-in" replace />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/results"
              element={
                <>
                  <SignedIn>
                    <Results />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/login" replace />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/item/:id"
              element={
                <>
                  <SignedIn>
                    <ItemDetail />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/login" replace />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/admin"
              element={
                <>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                  <SignedIn>
                    <AdminDashboard />
                  </SignedIn>
                </>
              }
            />
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;