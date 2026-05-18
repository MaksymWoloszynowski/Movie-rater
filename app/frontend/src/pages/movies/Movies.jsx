import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import api from "../../api/api";
import Search from "../../components/search/Search";
import MoviesList from "../../components/moviesList/MoviesList";
import styles from "./Movies.module.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useDebounce(
    () => setDebouncedSearchTerm(searchTerm),
    500,
    [searchTerm]
  );

  const fetchMovies = async (query = "") => {
    setLoading(true);
    setError("");

    try {
      const result = await api.get(
        `/search?q=${encodeURIComponent(query)}`
      );

      setMovies(result.data);
    } catch (err) {
      console.error(err);
      setError("Error fetching movies");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Search Movies</h1>

        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {loading && <p className={styles.message}>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && (
          <MoviesList movies={movies} />
        )}
      </div>
    </div>
  );
};

export default Movies;