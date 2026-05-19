import styles from "./ReviewCard.module.css";
import MovieCard from "../../movieCard/MovieCard";
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  const movieData = {
    title: review.movie_title,
    release_date: review.movie_release_date,
    poster_path: review.movie_poster_path,
    slug: review.movie_slug,
    original_language: review.movie_original_language,
  };

  return (
    <div className={styles.review}>
      <MovieCard movie={movieData} />

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.rating}>
            <Rating value={review.rating} max={10} precision={1} readOnly />

            <span className={styles.ratingNumber}>{review.rating}/10</span>
          </div>

          {review.created_at && (
            <span className={styles.date}>
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          )}
        </div>

        {review.comment && <p className={styles.comment}>{review.comment}</p>}
      </div>
    </div>
  );
};

export default ReviewCard;
