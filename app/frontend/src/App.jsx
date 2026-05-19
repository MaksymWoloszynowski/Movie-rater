import { Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import Home from "./pages/home/Home";
import Movies from "./pages/movies/Movies";
import Movie from "./pages/movie/Movie";
import AppLayout from "./layouts/AppLayout";
import PersistLogin from "./pages/PersistLogin";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="discover" element={<Movies />} />
          <Route path="movies/:slug" element={<Movie />} />
          <Route path="users/:username" element={<Profile />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
