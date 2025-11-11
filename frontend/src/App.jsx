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
//postes
import Postes from "./pages/Postes/Postes";

//books
import BookList from "./components/books/BookList";

//Clubs
import Clubs from "./pages/Clubs/ClubsPage";
import ClubDetails from "./components/clubs/ClubDetails";
import CreateClub from "./components/clubs/CreateClub";

//
import ClubEvents from "./components/clubs/ClubEvents";
// import NotificationBell from "./components/clubs/NotificationBell";
import Notifications from "./components/clubs/Notifications";
import ClubMembers from "./components/clubs/ClubMembers";

import AdminMarketplace from "./pages/Marketplace/AdminMarketplace";
// import Marketplace from './pages/Marketplace';

// Composant de layout pour gérer l'espace header
const PageLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 pt-20">
      {" "}
      {/* ESPACE POUR HEADER FIXE */}
      {children}
    </main>
    <Footer />
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pages AVEC header et footer */}
        <Route
          path="/"
          element={
            <PageLayout>
              <Home />
            </PageLayout>
          }
        />
        <Route
          path="/explore"
          element={
            <PageLayout>
              <Explore />
            </PageLayout>
          }
        />
        <Route
          path="/marketplace"
          element={
            <PageLayout>
              <Marketplace />
            </PageLayout>
          }
        />

        {/* /// */}
        <Route
          path="/admin/marketplace"
          element={
            <PageLayout>
              <AdminMarketplace />
            </PageLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <PageLayout>
              <Profile />
            </PageLayout>
          }
        />

        {/* postes */}
        <Route
          path="/postes"
          element={
            <PageLayout>
              <Postes />
            </PageLayout>
          }
        />

        {/* Books */}
        <Route
          path="/booklist"
          element={
            <PageLayout>
              <BookList />
            </PageLayout>
          }
        />

        {/* CIubs */}
        <Route
          path="/club"
          element={
            <PageLayout>
              <Clubs />
            </PageLayout>
          }
        />

        {/* Pages SANS header et footer (auth) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* //test cIub */}
        <Route path="/clubs/:id" element={<ClubDetails />} />
        <Route path="/create" element={<CreateClub />} />

        <Route path="/clubs/:id/members" element={<ClubMembers />} />
        <Route path="/clubs/:id/events" element={<ClubEvents />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}
