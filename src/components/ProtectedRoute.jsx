import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      console.log("Supabase session:", session);
      console.log("Supabase error (if any):", error);

      if (session && session.user.email === "admin@gmail.com") {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return null;

  return authenticated ? children : <Navigate to="/adminlogin" />;
};

export default ProtectedRoute;
