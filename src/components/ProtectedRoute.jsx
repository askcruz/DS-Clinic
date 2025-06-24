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
      } = await supabase.auth.getSession();

      if (session && session.user.email === "admin@gmail.com") {
        //remove the admin@gmail.com if we are not sticking with one email
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
