import React, { useState } from "react";
import {
  useGetNewMovieQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies.js";
import { useFetchGenreQuery } from "../../redux/api/genre.js";
import SliderUtil from "../../components/SliderUtil.jsx";

export const MovieContainerPage = () => {
  const { data } = useGetNewMovieQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenreQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-10">
      {/* Sidebar: Genre Filter */}
      <nav className="bg-gray-900 p-5 rounded-lg shadow-md lg:w-[18rem]">
        <h2 className="text-white text-xl font-semibold mb-4">Genres</h2>
        <div className="flex flex-col space-y-2">
          {genres?.map((g) => (
            <button
              key={g._id}
              className={`transition duration-300 ease-in-out p-3 rounded-md text-lg text-left font-medium ${
                selectedGenre === g._id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-blue-700 hover:text-white"
              }`}
              onClick={() => handleGenreClick(g._id)}
            >
              {g.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <section className="flex flex-col items-center w-full">
        {/* "Choose for You" Section */}
        <div className="w-full lg:w-[80rem] bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl text-white font-semibold mb-4">
            🔥 Choose for You
          </h1>
          <SliderUtil data={randomMovies} />
        </div>

        {/* "Top Movies" Section */}
        <div className="w-full lg:w-[80rem] bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl text-white font-semibold mb-4">
            🏆 Top Movies
          </h1>
          <SliderUtil data={topMovies} />
        </div>

        {/* "Choose Movie" Section */}
        <div className="w-full lg:w-[80rem] bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl text-white font-semibold mb-4">
            🎬 Choose Movie
          </h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  );
};

export default MovieContainerPage;

// import React, { useState } from "react";
// import {
//   useGetNewMovieQuery,
//   useGetTopMoviesQuery,
//   useGetRandomMoviesQuery,
// } from "../../redux/api/movies.js";

// import { useFetchGenreQuery } from "../../redux/api/genre.js";
// import SliderUtil from "../../components/SliderUtil.jsx";

// export const MovieContainerPage = () => {
//   const { data } = useGetNewMovieQuery();
//   const { data: topMovies } = useGetTopMoviesQuery();
//   const { data: genres } = useFetchGenreQuery();
//   const { data: randomMovies } = useGetRandomMoviesQuery();

//   const [selectedGenre, setSelectedGenre] = useState(null);

//   const handleGenreClick = (genreId) => {
//     setSelectedGenre(genreId);
//   };

//   const filteredMovies = data?.filter(
//     (movie) => selectedGenre === null || movie.genre === selectedGenre
//   );

//   return (
//     <div className="flex flex-col lg:flex-row lg:justify-between items-center">
//       <nav className="ml-[4rem] flex flex-col items-start space-y-2">
//         {genres?.map((g) => (
//           <button
//             key={g._id}
//             className={`transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white p-2 rounded-md text-lg w-full text-left ${
//               selectedGenre === g._id
//                 ? "bg-gray-800 text-white"
//                 : "text-gray-300"
//             }`}
//             onClick={() => handleGenreClick(g._id)}
//           >
//             {g.name}
//           </button>
//         ))}
//       </nav>

//       <section className="flex flex-col justify-center items-center w-full lg:w-auto">
//         <div className="w-full lg:w-[100rem] mb-8 ">
//           <h1 className="mb-5">Choose For You</h1>
//           <SliderUtil data={randomMovies} />
//         </div>

//         <div className="w-full lg:w-[100rem] mb-8">
//           <h1 className="mb-5">Top Movies</h1>
//           <SliderUtil data={topMovies} />
//         </div>

//         <div className="w-full lg:w-[100rem] mb-8">
//           <h1 className="mb-5">Choose Movie</h1>
//           <SliderUtil data={filteredMovies} />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default MovieContainerPage;
