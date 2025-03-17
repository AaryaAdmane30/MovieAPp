import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchGenreQuery } from "../../redux/api/genre";
import {
  useGetAllMoviesQuery,
  useGetNewMovieQuery,
  useGetRandomMoviesQuery,
  useGetTopMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import banner from "../../assets/banner.jpg";
import {
  setFilteredMovies,
  setMoviesFilter,
  setMoviesYears,
  setUniqueYears,
} from "../../redux/movies/moviesSlice.js";

export default function AllMovies() {
  const dispatch = useDispatch();
  const { data: movies } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenreQuery();
  const { data: newMovies } = useGetNewMovieQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();

  const { moviesFilter, filteredMovies, uniqueYears } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (movies && movies.length > 0) {
      console.log("Movies Data:", movies);

      const movieYears = movies.map((movie) => movie.year);

      // Get unique years
      const uniqueYears = Array.from(new Set(movieYears)).sort((a, b) => b - a);
      console.log("Unique Years:", uniqueYears);

      // Dispatch data to Redux
      dispatch(setFilteredMovies(movies));
      dispatch(setMoviesYears(movieYears));
      dispatch(setUniqueYears(uniqueYears));
    }
    // ✅ Initially, show all movies
    setFilteredMovies(movies);
  }, [movies, dispatch]);

  // Handle search Change
  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = movies.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };
  // hANDLE yEAR change

  const handleYearChange = (year) => {
    const filterByYear = movies.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  //  Sort The Movie By type  (new Top random):

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;

      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;

      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;

      default:
        dispatch(setFilteredMovies([]));

        break;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
      <section>
        {/* Banner Section */}
        <div
          className="relative h-[40rem] w-screen mb-10 flex items-center justify-center bg-cover"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60 flex items-center justify-center">
            <div className="relative z-10 text-center text-white translate-y-16">
              <h1 className="text-7xl font-bold mb-4 tracking-wide">
                🎬 The Movies Hub
              </h1>
              <p className="text-2xl text-gray-300">
                Cinematic Odyssey: Unveiling The Magic of Movies
              </p>
            </div>
          </div>

          {/* Search & Filter Section */}
          <section className="absolute -bottom-[4.5rem] w-full flex flex-col items-center space-y-4">
            {/* Search Bar */}
            <div className="w-[90%] md:w-[60%] lg:w-[40%]">
              <input
                type="text"
                className="w-full text-black h-14 border border-gray-300 px-6 rounded-lg outline-none text-lg shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                placeholder="🔍 Search Movies..."
                value={moviesFilter?.searchTerm || ""}
                onChange={handleSearchChange}
              />
            </div>

            {/* Genre Dropdown */}
            <div className="w-[90%] md:w-[40%] flex justify-center">
              <select
                className="w-[11rem] p-3 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200 cursor-pointer hover:bg-gray-100"
                value={moviesFilter?.selectedGenre || ""}
                // onChange={(e) => handleGenreClick(e.target.value)}
              >
                <option value="">🎭 Select Genre</option>
                {genres?.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>

              {/* Year Dropdown */}
              <select
                className="w-[10rem] ml-4 p-3 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200 cursor-pointer hover:bg-gray-100"
                value={moviesFilter?.selectedYear || ""}
                onChange={(e) => handleYearChange(e.target.value)}
              >
                <option value="">Year</option>
                {uniqueYears?.length > 0 ? (
                  uniqueYears.map((year, index) => (
                    <option key={`year-${index}`} value={year}>
                      {year}
                    </option>
                  ))
                ) : (
                  <option disabled>No Years Available</option>
                )}
              </select>

              {/*  */}
              <select
                className="w-[10rem] ml-4 p-3 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200 cursor-pointer hover:bg-gray-100"
                value={moviesFilter.selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Sort By </option>

                <option value="new"> New Movies </option>

                <option value="top">Top Movies</option>

                <option value="random">Random Movies </option>
              </select>
            </div>
          </section>
        </div>

        <section className="wt-[10rem] w-screen flex justify-center items-center flex-wrap">
          {filteredMovies?.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </section>
      </section>
    </div>
  );
}
