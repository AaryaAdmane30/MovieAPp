import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

// Restrcited :
import Login from "./pages/Auth/Login.jsx";
import Regsiter from "./pages/Auth/Regsiter.jsx";

// import PrivateRoute from "./pages/Auth/PrivateRoute.jsx";

// Pages
import Home from "./pages/Home.jsx";
import PrivateRoute from "./pages/Auth/PrivateRoute.jsx";
import Profile from "./pages/User/Profile.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import GenreList from "./pages/Admin/GenreList.jsx";
import CreateMovie from "./pages/Admin/CreateMovie.jsx";
import AdminMoviesList from "./pages/Admin/AdminMoviesList.jsx";
import UpdateMovie from "./pages/Admin/UpdateMovie.jsx";
import AllMovies from "./pages/Movies/AllMovies.jsx";
import MoviesDetail from "./pages/Movies/MoviesDetail.jsx";
import AllComments from "./pages/Admin/AllComments.jsx";
import AdminDashBoard from "./pages/Admin/DashBoard/AdminDashBoard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    //  Public Routes  anyone can see :
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/movies" element={<AllMovies />} />
      <Route path="/register" element={<Regsiter />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/movies/:id" element={<MoviesDetail />} />

      {/* Admin Routes */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/movies/genre" element={<GenreList />} />
        <Route path="/admin/movies/create" element={<CreateMovie />} />
        <Route path="/admin/movies-list" element={<AdminMoviesList />} />
        <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
        <Route path="/admin/movies/dashboard" element={<AdminDashBoard />} />
        <Route path="/admin/movies/comments" element={<AllComments />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
