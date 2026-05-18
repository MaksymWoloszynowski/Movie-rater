import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import styles from "./AppLayout.module.css";

const AppLayout = () => {
  return (
    <div className={styles.layout}>
      <NavBar />

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;