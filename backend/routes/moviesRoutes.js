import express from "express";

const router = express.Router();

//  Controllers
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  gettopMoviews,
  getRandomMovies,
} from "../controllers/movieController.js";
//  Middleware

import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/authorizationMiddleware.js";

import checkId from "../middlewares/checkId.js";

// Public Routes :

router.get("/all-movies", getAllMovies); // http://localhost:3000/api/v1/movies/all-movies

router.get("/specific-movie/:id", getSpecificMovie); // //  http://localhost:3000/api/v1/movies/specific-movie/67a653676d7d6c4d48837adb

router.get("/new-movie", getNewMovies);
router.get("/top-movies", gettopMoviews); // http://localhost:3000/api/v1/movies//top-movies

router.get("/random-movie", getRandomMovies);
// GET http://localhost:5173/api/v1/movies/random-movie

//Restricted Routes:

router.post("/:id/reviews", authenticate, checkId, movieReview); // http://localhost:3000/api/v1/movies/67a653676d7d6c4d48837adb/reviews
// can be authorized  and seen by evryone not only The Authorized Admin

//  {
//   "rating": "3",
//   "comment": "One of the best action Movie"
// } rarting and comment is required for reviews

//  Admin:

router.post("/create-movie", authenticate, authorizeAdmin, createMovie); //  http://localhost:3000/api/v1/movies/create-movie

router.put("/update-movie/:id", authenticate, authorizeAdmin, updateMovie); // http://localhost:3000/api/v1/movies/update-movie/67a653676d7d6c4d48837adb

router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);

// router.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment); // http://localhost:3000/api/v1/movies/delete-comment add body and provide movie id
router.delete(
  //  delete should not hve request body
  "/:movieId/delete-comment/:reviewId",
  authenticate,
  authorizeAdmin,
  deleteComment
);

export default router;
