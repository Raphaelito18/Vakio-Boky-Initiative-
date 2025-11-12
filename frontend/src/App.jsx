import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Explore from './pages/Explore/Explore';
import Marketplace from './pages/Marketplace/Marketplace';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <Router>
      <div className="main flex flex-col min-h-screen">
        <Header />
        <section className="grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/marketplace' element={<Marketplace />} />
          </Routes>
        </section>
        <Footer />
      </div>
    </Router>
  );
}
