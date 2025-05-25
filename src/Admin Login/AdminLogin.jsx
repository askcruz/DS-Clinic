import styles from "./AdminLogin.module.css";
import Button from "../components/Button";

const AdminLogin = () => {
  return (
    <div className={styles["admin-login-page"]}>
      <img className={styles.front} src="storefront.jpg" />
      <div className={styles.login}>
        <div className={styles.logo}>
          <img className={styles.logo2} src="logo2black.png" />
          <div className={styles["ds-clinic"]}>DS Clinic </div>
        </div>
        <div className={styles.container}>
          <div className={styles["admin-login"]}>ADMIN LOGIN </div>
          <div className={styles.fields}>
            <div className={styles.username}>Username </div>
            <input className={styles.textbox} type="text" placeholder="Enter username" />
            <div className={styles.password}>Password </div>
            <input className={styles.textbox} type="password" placeholder="Enter password" />
          </div>
          <Button className={styles["admin-login-btn"]}>Login</Button>
          {/* placeholder button only, pakichange na lang */}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;