import { createContext, useContext, useState, useEffect } from "react";

// 💡 Contexte global d'authentification
const AuthContext = createContext();

// ⚙️ Fournisseur du contexte (à placer autour de ton <App />)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("vakio_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 🔐 Connexion
  const login = (data) => {
    setUser(data);
    localStorage.setItem("vakio_user", JSON.stringify(data));
  };

  // 🚪 Déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem("vakio_user");
  };

  // 🔁 Vérification automatique (persist session)
  useEffect(() => {
    const storedUser = localStorage.getItem("vakio_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 🧩 Hook pour accéder à l'auth partout dans l'app
export function useAuth() {
  return useContext(AuthContext);
}
