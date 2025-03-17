import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies.js";
import MovieTabs from "./MovieTabs.jsx";

export default function MoviesDetail() {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  console.log("Movie data:", movie);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  console.log("Movie image URL:", movie?.image);

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("Submitting review:", { id: movieId, rating, comment });

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch(); // Refresh data
      toast.success("Review created successfully");
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const baseURL = "http://localhost:3000/";

  return (
    <>
      {/* Back Button */}
      <div className="mt-4">
        <Link to="/" className="text-white font-semibold hover:underline ml-10">
          Go Back
        </Link>
      </div>

      {/* Movie Poster */}
      <div className="flex justify-center mt-10">
        <img
          src={
            movie?.image
              ? `${baseURL}${movie.image.replace("\\", "/")}`
              : "https://via.placeholder.com/500"
          }
          alt={movie?.name || "Movie poster"}
          className="w-[80%] rounded-lg lg:w-[50%] shadow-lg"
        />
      </div>

      {/* Movie Details & Cast Section */}
      <div className="mt-10 w-[90%] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Movie Details */}
        <div className="text-left">
          <h2 className="text-4xl font-extrabold">{movie?.name}</h2>
          <p className="mt-4 text-lg text-gray-400">
            {movie?.detail || "No details available"}
          </p>
        </div>

        {/* Right Section: Release Date & Cast */}
        <div className="md:ml-[5rem] lg:ml-[10rem]">
          <p className="text-xl font-semibold mb-4">
            Releasing Date: {movie?.year || "Unknown"}
          </p>

          {/* Cast Section */}
          <h3 className="text-xl font-bold">Cast:</h3>
          {movie?.cast?.length > 0 ? (
            <ul className="mt-2 space-y-1">
              {movie.cast.map((c, index) => (
                <li key={index} className="text-gray-300">
                  {c}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No cast information available</p>
          )}
        </div>
      </div>

      {/* Movie Tabs ffrom Movie folder */}
      <div className="container mx-auto text-white">
        <MovieTabs
          loadingMovieReview={loadingMovieReview}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          movie={movie}
        />
      </div>
    </>
  );
}
