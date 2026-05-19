import React from "react";
import styles from "./ReviewsList.module.css";
import ReviewCard from "../reviewCard/ReviewCard";

const ReviewsList = ({ reviews }) => {
  if (!reviews?.length) {
    return <p className={styles.empty}>No reviews yet</p>;
  }
  return (
    <div className={styles.list}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsList;
