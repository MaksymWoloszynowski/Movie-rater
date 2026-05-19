import React from "react";
import MovieCard from "../movieCard/MovieCard";
import styles from "./MoviesList.module.css";

const MoviesList = ({ movies }) => {

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;