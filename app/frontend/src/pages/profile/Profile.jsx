import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import styles from "./Profile.module.css";
import ReviewsList from "../../components/userReviews/reviewsList/ReviewsList";

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userRes = await api.get(`/users/${username}`);
        const reviewsRes = await api.get(`/users/${username}/reviews`);

        setProfile(userRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <p className={styles.center}>Loading...</p>;
  if (!profile) return <p className={styles.center}>User not found</p>;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.avatar}>{profile.username[0].toUpperCase()}</div>

        <h1 className={styles.username}>{profile.username}</h1>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.number}>{profile.reviews_count}</span>
            <span className={styles.label}>Reviews</span>
          </div>

          <div className={styles.stat}>
            <span className={styles.number}>
              {Number(profile.average_review).toFixed(1)}
            </span>
            <span className={styles.label}>Avg rating</span>
          </div>
        </div>
        <ReviewsList reviews={reviews} />
      </div>
    </div>
  );
};

export default Profile;
