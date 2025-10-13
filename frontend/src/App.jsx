// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home/Home';
// import Explore from './pages/Explore/Explore';
// import Marketplace from './pages/Marketplace/Marketplace';
// import Header from './components/layout/Header';
// import Footer from './components/layout/Footer';
// import Login from './components/modales/Login';



// export default function App() {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/explore' element={<Explore />} />
//         <Route path='/marketplace' element={<Marketplace />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Explore from './pages/Explore/Explore';
import Marketplace from './pages/Marketplace/Marketplace';
import Login from './components/modales/Login';
import BaseLayout from './layouts/BaseLayout';
import ExploreLayout from './layouts/ExploreLayout';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<BaseLayout><Home /></BaseLayout>} />
        <Route path='/login' element={<Login />} />
        <Route path='/explore' element={<ExploreLayout><Explore /></ExploreLayout>} />
        <Route path='/marketplace' element={<BaseLayout><Marketplace /></BaseLayout>} />
      </Routes>
    </Router>
  );
}


// Doc sur taiIWindCSS
// export default function App() {
//   return (
//     <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-900 to-blue-600 text-white text-center">
//       <h1 className="text-5xl font-bold mb-4">Bienvenue sur Vakio Boky</h1>
//       <p className="text-lg mb-8">La plateforme des passionnés de lecture 📚</p>
//       <button className="bg-white text-blue-800 font-medium px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-300">
//         Explorer
//       </button>
//     </section>
//   );
// }
