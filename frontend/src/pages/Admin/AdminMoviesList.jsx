import React from "react";
import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies.js";

export default function AdminMoviesList() {
  const { data: movies, isLoading, isError } = useGetAllMoviesQuery();

  if (isLoading) {
    return (
      <div className="text-center text-white text-xl mt-10">
        Loading movies...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Failed to load movies.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 mt-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          All Movies ({movies?.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies?.map((movie) => (
            <Link
              key={movie._id}
              to={`/admin/movies/update/${movie._id}`}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={
                  movie.image.startsWith("uploads")
                    ? `http://localhost:3000/${movie.image.replace("\\", "/")}`
                    : movie.image
                }
                alt={movie.name}
                className="w-full h-55 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{movie.name}</h3>
                {movie.detail && (
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {movie.detail}
                  </p>
                )}
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md">
                  Update Movie
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
