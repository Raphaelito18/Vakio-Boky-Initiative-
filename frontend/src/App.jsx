import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Marketplace from "./pages/Marketplace/Marketplace";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
//
import Login from "./components/modales/Login";
import Register from "./components/modales/Register";
import ForgotPassword from "./components/modales/ForgotPassword";
import VerifyCode from "./components/modales/VerifyCode";
import ResetPassword from "./components/modales/ResetPassword";
//
import Profile from "./pages/Profile/Profile";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* //mot de passe */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* //profiIe */}

<Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}
