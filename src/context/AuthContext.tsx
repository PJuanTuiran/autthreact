import React, { createContext, useContext, useState, ReactNode } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { app } from "../firebaseConfig/firebase"; // Asegúrate de que el archivo de configuración de Firebase esté configurado correctamente.

// Tipos de usuario para el contexto
interface AuthContextProps {
  user: any; // Puedes especificar un tipo más estricto si sabes la estructura del usuario.
  loginWithGoogle: () => Promise<void>;
  loginWithMicrosoft: () => Promise<void>;
  logout: () => Promise<void>;
}

// Crear el contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Crear el proveedor del contexto
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth(app); // Instancia de Firebase Auth

  // Función para iniciar sesión con Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        console.log(result)
        
      setUser(result.user); // Guarda al usuario autenticado en el estado
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  // Función para iniciar sesión con Microsoft
  const loginWithMicrosoft = async () => {
    const provider = new OAuthProvider("microsoft.com"); // Proveedor de Microsoft
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result) 
      setUser(result.user); // Guarda al usuario autenticado en el estado
    } catch (error) {
      console.error("Error al iniciar sesión con Microsoft:", error);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, loginWithMicrosoft, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Crear un hook personalizado para usar el contexto
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
export default AuthProvider;