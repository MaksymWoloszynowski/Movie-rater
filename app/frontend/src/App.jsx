import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Movies from "./pages/movies/Movies";
import Movie from "./pages/movie/Movie";
import AppLayout from "./layouts/AppLayout";
import Profile from "./pages/profile/Profile";
import Admin from "./pages/admin/Admin";
import useAuth from "./layouts/hooks/useAuth";

function App() {

  const { isLogin } = useAuth();

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="discover" element={<Movies />} />
        <Route path="movies/:slug" element={<Movie />} />
        <Route path="users/:username" element={<Profile />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
