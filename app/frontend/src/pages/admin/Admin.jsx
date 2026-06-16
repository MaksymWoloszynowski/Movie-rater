import React, { useEffect, useState } from "react";
import api from "../../api/api";
import styles from "./Admin.module.css";
import useAuth from "../../layouts/hooks/useAuth";

const Admin = () => {
  const { isAdmin } = useAuth();
  const [form, setForm] = useState({ title: "", slug: "", release_date: "", poster_path: "", original_language: "", overview: "" });
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/movies", form);
      setMovies((m) => [res.data.movie, ...m]);
      setForm({ title: "", slug: "", release_date: "", poster_path: "", original_language: "", overview: "" });
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAdmin) return <p className={styles.center}>Not authorized</p>;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin panel</h1>

        <form className={styles.form} onSubmit={handleAdd}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
          <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" />
          <input name="release_date" type="date" value={form.release_date} onChange={handleChange} placeholder="Release date" />
          <input name="original_language" value={form.original_language} onChange={handleChange} placeholder="Language" />
          <input name="poster_path" value={form.poster_path} onChange={handleChange} placeholder="Poster URL" />
          <textarea name="overview" value={form.overview} onChange={handleChange} placeholder="Overview" />

          <button className={styles.addButton} type="submit">Add movie</button>
        </form>

      </div>
    </div>
  );
};

export default Admin;
