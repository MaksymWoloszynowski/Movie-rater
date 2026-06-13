import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../api/api";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { isLogin, username, keycloak } = useAuth();
  const navigate = useNavigate();

  console.log()

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          MovieRater
        </Link>

        <Link to="/discover">Discover</Link>
      </div>

      <div className={styles.right}>
        {isLogin ? (
          <>
            <span>Hello, {username}</span>
            <Link to={`/users/${username}`}>Profile</Link>

            <button onClick={() => keycloak.logout({redirectUri: window.location.origin})} className={styles.logout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => keycloak.login()}>Login</button>
            <button onClick={() => keycloak.register()}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
