// import React from 'react';

// export default function Home() {
//   return (
//     <div>
//       <h1 className='text-2xl font-bold mb-4'>Fil d'actualité</h1>
//       <p className=''>
//         Bienvenue sur Vakio Boky Initiative — connectons les lecteurs et les
//         auteurs.
//       </p>
//     </div>
//   );
// }

import Header from "@/components/layout/Header";
import "@/index.css";

//
import { useNavigate } from "react-router-dom";
import Explore from "../Explore/Explore";


export default function App() {

  const nav = useNavigate();

  const explore = () => {
    nav("/explore");
  }

  const login = () => {
    nav("/login");
  }

  return (
    <div className="relative min-h-screen text-gray-800">
      {/* Image: Juste pour voir  */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{ backgroundImage: "url('/assets/images/home.jpeg')" }}
      ></div>

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10">
        <Header />
        <main className="pt-20 text-center px-4">
          <h1 className="text-5xl font-bold text-black mt-20 mb-2 leading-tight">
            Votre Sanctuaire
            {/* Lasa tsy mifanitsy fa tadiavana hevitra */}
            <h2
              className="text-6xl mb-8 leading-tight text-blue-800"
              style={{
                fontFamily: "'UnifrakturCook', cursive",
                fontWeight: 700,
                textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              }}
            >
              Littéraire
            </h2>
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl text-gray-900 leading-relaxed font-serif">
              « Plongez dans un univers où les mots prennent vie et les
              discussions
            </p>
            <p className="text-2xl text-gray-900 leading-relaxed font-serif">
              enflamment les esprits. Rejoignez notre cercle de professionnels
            </p>
            <p className="text-2xl text-gray-900 leading-relaxed font-serif mb-8">
              des livres. »
            </p>
          </div>
          {/* test de pagePubIic */}
          <button onClick={explore}>ExpoIrer</button>
          <button onClick={login}>Se connecter</button>
        </main>
      </div>
    </div>
  );
}
