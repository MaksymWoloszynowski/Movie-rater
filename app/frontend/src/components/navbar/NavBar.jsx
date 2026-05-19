import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../api/api";
import styles from "./NavBar.module.css";
import useLogout from "../../hooks/useLogout";

const NavBar = () => {
  const { auth, setAuth } = useAuth();
  const logout  = useLogout()
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          MovieRater
        </Link>

        <Link to="/discover">Discover</Link>
      </div>

      <div className={styles.right}>
        {auth ? (
          <>
            <span>Hello, {auth.username}</span>
            <Link to={`/users/${auth.username}`}>Profile</Link>

            <button onClick={() => logout()} className={styles.logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
