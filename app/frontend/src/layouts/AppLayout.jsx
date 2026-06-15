import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import useAuth from "../hooks/useAuth";
import Banned from "../pages/banned/Banned";
import styles from "./AppLayout.module.css";

const AppLayout = () => {
  const { isBanned, initialized } = useAuth();

  if (!initialized) return null;

  if (isBanned) return <Banned />;

  console.log(isBanned)

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