// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("vakio_user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Connexion
//   const login = (data) => {
//     setUser(data);
//     localStorage.setItem("vakio_user", JSON.stringify(data));
//   };

//   // Déconnexion
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("vakio_user");
//   };

//   // Vérification
//   useEffect(() => {
//     const storedUser = localStorage.getItem("vakio_user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("vakio_user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Erreur parsing localStorage:", error);
      localStorage.removeItem("vakio_user");
      return null;
    }
  });

  // Connexion
  const login = (data) => {
    setUser(data);
    localStorage.setItem("vakio_user", JSON.stringify(data));
  };

  // Déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem("vakio_user");
  };

  // Vérification de la validité du token
  const isTokenValid = () => {
    if (!user?.token) return false;
    
    try {
      // Vérification basique du token (vous pouvez ajouter une vérification JWT)
      const tokenParts = user.token.split('.');
      return tokenParts.length === 3; // Un JWT valide a 3 parties
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (!isTokenValid()) {
      logout(); // Déconnecter si token invalide
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      isAuthenticated: !!user?.token && isTokenValid()
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}