import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Movie App</h1>

        <p className={styles.subtitle}>
          Browse movies, read reviews and share your opinion.
        </p>

        <div className={styles.hero}>
          <img src="/hero.png" alt="Hero" />
        </div>

        <Link to="/discover" className={styles.button}>
          Explore Movies
        </Link>
      </div>
    </div>
  );
};

export default Home;
