import Movie from "../models/Movie.js";

//  Creating Movie:
const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const saveMovie = await newMovie.save();
    res.json(saveMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//  Getting All Movie :
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//  getting Specific Movie by Id :
const getSpecificMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const specificMovie = await Movie.findById(id);
    if (!specificMovie) {
      return res.status(404).json({ message: "Movie not Found" });
    }

    res.json(specificMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

//  Updating The Movie:
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not Found" });
    }

    res.json(updatedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// Movie Review :

//  {
//   "rating": "3",
//   "comment": "One of the best action Movie"
// } rarting and comment is required for reviews

const movieReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const alreadyReviewed = movie.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Movie Already Reviewed" });
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    movie.reviews.push(review);
    movie.numReviews = movie.reviews.length;

    movie.rating =
      movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
      movie.reviews.length;

    await movie.save();

    res.status(201).json({ message: "Review Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//  Deeleting Movie:

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovie = await Movie.findByIdAndDelete(id);
    if (!deleteMovie) {
      return res.status(404).json({ message: "Movie not Found" });
    }

    res.json({ message: "Movie Deleted Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

//  Delete Comment :
const deleteComment = async (req, res) => {
  try {
    const { movieId, reviewId } = req.params; //  delete should not hve request body
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not Found" });
    }

    console.log("Searching for movie with ID:", movieId);

    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );

    // r represents each review object inside the movie.reviews array.
    // r._id is an ObjectId
    // .toString() converts the _id into a string for comparison.
    // Compares the string version of _id with reviewId.

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Comment not Found" });
    }

    // Removing  the review from the array
    movie.reviews.splice(reviewIndex, 1); // splice(index, 1) removes 1 element from the movie.reviews array at the reviewIndex.
    movie.numReviews = movie.reviews.length;

    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;
    // Iterates over each review in movie.reviews.
    // Adds up all ratings (item.rating + acc).
    // acc (accumulator) starts at 0.
    // Returns the sum of all ratings.

    await movie.save();
    console.log("Review Deleted Successfully!");

    res.json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

//  Get  New Movies :
const getNewMovies = async (req, res) => {
  try {
    const newMovie = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(newMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

const gettopMoviews = async (req, res) => {
  try {
    const topRatedMovie = await Movie.find().sort({ numReviews: -1 }).limit(10);
    res.json(topRatedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

const getRandomMovies = async (req, res) => {
  try {
    const randomMovie = await Movie.aggregate([{ $sample: { size: 10 } }]);
    // aggregate() method is used to perform advanced data processing and transformations on documents within a collection. It allows you to perform operations such as filtering, grouping, sorting, and reshaping data in a flexible and efficient way.
    res.json(randomMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};
export {
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
};
