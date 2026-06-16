import React from "react";
import styles from "./Banned.module.css";

const Banned = () => {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>You are banned</h1>
        <p className={styles.subtitle}>Your account is banned and cannot access the site.</p>
      </div>
    </div>
  );
};

export default Banned;
