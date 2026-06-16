import React from "react";
import styles from "./MovieCard.module.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.slug}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        className={styles.poster}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "/no-movie.png"
        }
        alt={movie.title}
      />

      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>

        <div className={styles.meta}>
          <span>•</span>

          <p className={styles.lang}>
            {movie.original_language?.toUpperCase()}
          </p>

          <span>•</span>

          <p className={styles.year}>
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
