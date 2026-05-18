import React from "react";
import MovieCard from "../movieCard/MovieCard";
import styles from "./MoviesList.module.css";

const MoviesList = ({ movies }) => {
  if (!movies?.length) {
    return <p className={styles.empty}>No movies found</p>;
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;