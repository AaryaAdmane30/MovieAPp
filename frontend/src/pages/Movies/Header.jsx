import React from "react";
import { useGetNewMovieQuery } from "../../redux/api/movies.js";
import { Link } from "react-router-dom";
import SliderUtil from "../../components/SliderUtil.jsx";

export default function Header() {
  const { data } = useGetNewMovieQuery();

  return (
    <header className="flex flex-col md:flex-row items-center justify-between mt-20 mx-6 md:items-start bg-gray-900 p-6 rounded-xl shadow-lg">
      {/* Navigation Menu */}
      <nav className="w-full md:w-[10rem] flex flex-col gap-3">
        <Link
          to="/"
          className="text-lg font-medium text-white bg-gray-800 hover:bg-blue-600 transition-all px-5 py-2 rounded-lg shadow-md w-full text-center md:text-left"
        >
          Home
        </Link>

        <Link
          to="/browse"
          className="text-lg font-medium text-white bg-gray-800 hover:bg-blue-600 transition-all px-5 py-2 rounded-lg shadow-md w-full text-center md:text-left"
        >
          Browse Movies
        </Link>
      </nav>

      {/* Slider Section */}
      <div className="w-full md:w-3/4 mt-6 md:mt-0">
        <SliderUtil data={data} />
      </div>
    </header>
  );
}
