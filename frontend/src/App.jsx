import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
// Pages
import Home from './pages/Home';
import LostPage from './pages/LostPage';
import Results from './pages/Results';
import ItemDetail from './pages/ItemDetails';
import Found from './pages/Found';
function App() {
  return (
    <Router>
      <Header />
      <div className="mt-50px pl-4 pr-4 flex flex-col min-h-screen bg-black/95">
        <main className="mt-[50px] flex-1 pb-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lost" element={<LostPage />} />
            <Route path="/results" element={<Results />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/found" element={<Found />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
