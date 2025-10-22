// import { motion } from 'framer-motion';
// import { FiMail, FiLock, FiPhone } from 'react-icons/fi';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {

//   const nav = useNavigate();
//   const handleRegister = () => {
//     nav("/register");
//   }
//  const handleForgotPassword = () => {
//     nav("/forgot-password");
//   }
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white rounded-2xl shadow-xl border border-blue-200 p-8 w-full max-w-md"
//       >
//         {/* En-tête */}
//         <div className="text-center mb-8">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, type: "spring" }}
//             className="bg-blue-800 text-white rounded-lg px-4 py-3 inline-block mb-4"
//           >
//             <span className="block font-bold text-lg">#Vakio_Boky</span>
//             <span className="block text-sm font-light">Communauté Littéraire</span>
//           </motion.div>
          
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-blue-900 text-lg font-semibold"
//           >
//             Bienvenue dans la communauté littéraire
//           </motion.p>
//         </div>

//         {/* Formulaire */}
//         <motion.form
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="space-y-6"
//         >
//           {/* Champ Email/Téléphone */}
//           <div className="space-y-2">
//             <label className="text-blue-900 text-sm font-medium block">
//               Email ou Téléphone
//             </label>
//             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//               <Input
//                 variant="primary"
//                 size="lg"
//                 placeholder="votre@email.com ou 06..."
//                 icon={<FiMail className="text-blue-400" />}
//               />
//             </motion.div>
//           </div>

//           {/* Champ Mot de passe */}
//           <div className="space-y-2">
//             <label className="text-blue-900 text-sm font-medium block">
//               Mot de passe
//             </label>
//             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//               <Input
//                 variant="primary"
//                 size="lg"
//                 type="password"
//                 placeholder="Votre mot de passe"
//                 icon={<FiLock className="text-blue-400" />}
//               />
//             </motion.div>
//           </div>

//           {/* Case à cocher "Se souvenir de moi" */}
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="flex items-center space-x-2"
//           >
//             <input
//               type="checkbox"
//               id="remember"
//               className="w-4 h-4 text-blue-600 bg-blue-100 border-blue-300 rounded focus:ring-blue-500"
//             />
//             <label htmlFor="remember" className="text-blue-900 text-sm">
//               Se souvenir de moi
//             </label>
//           </motion.div>

//           {/* Bouton de connexion */}
//           <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//             <Button
//               variant="primary"
//               size="lg"
//               onClick={(e) => {
//                 e.preventDefault();
//                 // Logique de connexion
//               }}
//               className="w-full"
//             >
//               Se connecter
//             </Button>
//           </motion.div>

//           {/* Lien mot de passe oublié */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="text-center"
//           >
//             <motion.a
//               whileHover={{ scale: 1.05, color: "#1e40af" }}
//               href="#"
//               className="text-blue-600 text-sm hover:text-blue-800 transition-colors"

//               //
//               onClick={handleForgotPassword}
//             >
//               Mot de passe oublié ?
//             </motion.a>
//           </motion.div>

//           {/* Séparateur */}
//           <div className="relative flex items-center py-4">
//             <div className="flex-grow border-t border-blue-200"></div>
//             <span className="flex-shrink mx-4 text-blue-500 text-sm">ou</span>
//             <div className="flex-grow border-t border-blue-200"></div>
//           </div>

//           {/* Bouton d'inscription */}
//           <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//             <Button 
//               variant="outline"
//               size="lg"
//                onClick={handleRegister}
//               // onClick={(e) => {
//               //   e.preventDefault();
//               //   // Logique d'inscription
//               //    onClick={handleRegister}
//               // }}
//               className="w-full border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white" 
//             >
//               S'inscrire
//             </Button>
//           </motion.div>
//         </motion.form>

//         {/* Footer */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="mt-8 text-center"
//         >
//           <p className="text-blue-400 text-xs">
//             Rejoignez notre communauté de passionnés de lecture
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


export default function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // 🔁 Redirections
  const handleRegister = () => navigate("/register");
  const handleForgotPassword = () => navigate("/forgot-password");

  // 🔐 Gestion du login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mot_de_passe: motDePasse }),
      });

      const data = await response.json();
      console.log("🔐 Réponse du login:", data);

      if (response.ok) {
        const userData = {
          token: data.token,
          user: {
            id: data.user.id,
            role: data.user.role,
          },
        };

        // ✅ On enregistre via le hook
        login(userData);

        // 🧭 Redirection selon le rôle
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/explore");
        }
      } else {
        alert(data.error || "Email ou mot de passe incorrect.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  // 💅 Interface utilisateur avec Framer Motion
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl border border-blue-200 p-8 w-full max-w-md"
      >
        {/* En-tête */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-blue-800 text-white rounded-lg px-4 py-3 inline-block mb-4"
          >
            <span className="block font-bold text-lg">#Vakio_Boky</span>
            <span className="block text-sm font-light">Communauté Littéraire</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-blue-900 text-lg font-semibold"
          >
            Bienvenue dans la communauté littéraire
          </motion.p>
        </div>

        {/* Formulaire */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Email */}
          <div className="space-y-2">
            <label className="text-blue-900 text-sm font-medium block">
              Adresse e-mail
            </label>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Input
                variant="primary"
                size="lg"
                type="email"
                placeholder="exemple@email.com"
                icon={<FiMail className="text-blue-400" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>
          </div>

          {/* Mot de passe */}
          <div className="space-y-2">
            <label className="text-blue-900 text-sm font-medium block">
              Mot de passe
            </label>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Input
                variant="primary"
                size="lg"
                type="password"
                placeholder="Votre mot de passe"
                icon={<FiLock className="text-blue-400" />}
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
              />
            </motion.div>
          </div>

          {/* Bouton de connexion */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={loading}
              className="w-full"

              //redirection vers acceuiI
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </motion.div>

          {/* Lien mot de passe oublié */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              onClick={handleForgotPassword}
              className="text-blue-600 text-sm hover:text-blue-800 transition-colors underline"
            >
              Mot de passe oublié ?
            </motion.button>
          </motion.div>

          {/* Séparateur */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-blue-200"></div>
            <span className="flex-shrink mx-4 text-blue-500 text-sm">ou</span>
            <div className="flex-grow border-t border-blue-200"></div>
          </div>

          {/* Bouton d'inscription */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="lg"
              type="button"
              onClick={handleRegister}
              className="w-full border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
            >
              S'inscrire
            </Button>
          </motion.div>
        </motion.form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-blue-400 text-xs">
            Rejoignez notre communauté de passionnés de lecture
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
