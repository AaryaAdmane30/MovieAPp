import express from "express";

const router = express.Router();

//Controllers
import {
  createGenre,
  updateGenre,
  removeGenre,
  listGenres,
  readGenre,
} from "../controllers/genreController.js";

//Middleware:
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/authorizationMiddleware.js";

//  http://localhost:3000/api/v1/genre
router.route("/").post(authenticate, authorizeAdmin, createGenre);

//  http://localhost:3000/api/v1/genre/67a10cd9d36bf2c29ea30df6 (id from Db of genre created and update )
router.route("/:id").put(authenticate, authorizeAdmin, updateGenre);

router.route("/:id").delete(authenticate, authorizeAdmin, removeGenre);

// http://localhost:3000/api/v1/genre/genres
router.route("/genres").get(listGenres);

router.route(":/id").get(readGenre);
export default router;
