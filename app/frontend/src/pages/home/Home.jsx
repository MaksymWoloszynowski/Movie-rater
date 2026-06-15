import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/api";
import MoviesList from "../../components/moviesList/MoviesList";

const Home = () => {
  const [bestRatedMovies, setBestRatedMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await api.get("/movies/top10");

        setBestRatedMovies(result.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching movies");
        setBestRatedMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

        {loading && <p className={styles.message}>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

      </div>
      {!loading && !error && <MoviesList movies={bestRatedMovies} />}
    </div>
  );
};

export default Home;
