import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import useAuth from "../../layouts/hooks/useAuth";
import styles from "./Movie.module.css";
import { Rating } from "@mui/material";

const Movie = () => {
  const { slug } = useParams();
  const { isLogin } = useAuth();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const movieRes = await api.get(`/movies/${slug}`);
        const movieData = movieRes.data;

        setMovie(movieData);

        const reviewsRes = await api.get(`/movies/${movieData.id}/reviews`);
        console.log(reviewsRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const submitReview = async () => {
    if (!movie) return;

    try {
      await api.post(
        `/movies/${movie.id}/reviews`,
        { comment, rating },
        { withCredentials: true },
      );

      const updated = await api.get(`/movies/${movie.id}/reviews`);

      setReviews(updated.data);

      setComment("");
      setRating(5);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className={styles.center}>Loading...</p>;
  if (!movie) return <p className={styles.center}>Movie not found</p>;

  return (
    <div className={styles.page}>
      <div className={styles.movieHeader}>
        <img
          className={styles.poster}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "/no-movie.png"
          }
          alt={movie.title}
        />

        <div className={styles.info}>
          <h1>{movie.title}</h1>

          <p className={styles.meta}>
            {movie.original_language.toUpperCase()} •{" "}
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </p>

          <p className={styles.movieRating}>
              ⭐ {movie.average_rating ?? "0.0"} / 10 •{" "}
              {movie.reviews_count ?? 0} reviews
          </p>

          <p className={styles.overview}>
            {movie.overview || "No description available."}
          </p>
        </div>
      </div>

      <section className={styles.reviews}>
        <h2>Reviews</h2>

        {reviews.length === 0 && <p className={styles.empty}>No reviews yet</p>}

        {reviews.map((r) => (
          <div key={r.id} className={styles.review}>
            <div className={styles.header}>
              <Link to={`/users/${r.username}`}><span className={styles.username}>{r.username}</span></Link>
              <span className={styles.rating}>{r.rating}/10</span>
            </div>
            <p className={styles.comment}>{r.comment}</p>
          </div>
        ))}
      </section>

      <section className={styles.addReview}>
        <h3>Add Review</h3>

        {isLogin ? (
          <>
            <Rating
              name="customized-10"
              value={rating}
              max={10}
              onChange={(_, value) => {
                setRating(value);
              }}
              sx={{
                color: "#f5c518",
                "& .MuiRating-iconEmpty": {
                  color: "rgba(255,255,255,0.3)",
                },
              }}
            />

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className={styles.textarea}
            />

            <button onClick={submitReview} className={styles.button}>
              Submit Review
            </button>
          </>
        ) : (
          <p className={styles.loginInfo}>Login to add a review</p>
        )}
      </section>
    </div>
  );
};

export default Movie;
