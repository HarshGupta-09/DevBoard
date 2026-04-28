import { createContext, useEffect, useState } from "react";
import { getMe } from "../features/auth/auth.api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await getMe();
        setUser(res.data.user);
      } catch (err) {
        console.log("Auth error:", err);
        setUser(null);
        localStorage.removeItem("token"); 
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;