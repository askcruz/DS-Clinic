import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import styles from "./AdminLogin.module.css";
import Button from "../components/Button";
import Storefront from "../Assets/admin/storefront.jpg"; 
import Logo2Black from "../Assets/logos/logo2black.png";

const AdminLogin = () => {
  const [username, setUsername] = useState(""); // email
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoginFailed(false);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) {
      setLoginFailed(true);
      setUsername("");
      setPassword("");
      console.error("Login error:", error.message);

      setTimeout(() => {
        setLoginFailed(false);
      }, 2000);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className={styles["admin-login-page"]}>
      <img className={styles.front} src={Storefront} alt="Storefront" />
      <div className={styles.login}>
        <div className={styles.logo}>
          <img
            className={styles.logo2}
            src={Logo2Black}
            alt="DS Clinic Logo"
          />
          <div className={styles["ds-clinic"]}>DS Clinic</div>
        </div>
        <div className={styles.container}>
          <div className={styles["admin-login"]}>ADMIN LOGIN</div>
          <div className={styles.fields}>
            <div className={styles.username}>Email</div>
            <input
              className={`${styles.textbox} ${
                loginFailed ? styles.errorPlaceholder : ""
              }`}
              type="text"
              placeholder={loginFailed ? "Wrong credentials" : "Enter email"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className={styles.password}>Password</div>
            <input
              className={`${styles.textbox} ${
                loginFailed ? styles.errorPlaceholder : ""
              }`}
              type="password"
              placeholder={loginFailed ? "Wrong credentials" : "Enter password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className={styles["admin-login-btn"]} onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
