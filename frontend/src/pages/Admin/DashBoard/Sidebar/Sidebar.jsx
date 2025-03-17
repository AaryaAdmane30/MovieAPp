import React from "react";
import { Link } from "react-router";

export default function Sidebar() {
  return (
    <div className="-translate-y-10 flex h-screen fixed mt-10 border-r-2 border-[#242424]">
      <aside className="text-white w-64 flex-shrink-0">
        <ul className="py-4">
          <li className="mt-18 ml-10 text-lg bg-gradient-to-b from-purple-500 to-blue-400 rounded-full   hover:bg-lime-500 -translate-x-6">
            <Link
              to="/admin/movies/dashboard"
              className="block p-2 ml-10 mb-10 text-black"
            >
              DashBoard
            </Link>
          </li>

          <li className="mt-18 ml-10 text-lg bg-gradient-to-b from-green-500 to-lime-400 rounded-full -translate-x-6">
            <Link
              to="/admin/movies/create"
              className="block p-2 ml-10 mb-10 text-black"
            >
              Create Movie
            </Link>
          </li>

          <li className="mt-18 ml-10 text-lg bg-gradient-to-b from-green-500 to-lime-400 rounded-full -translate-x-6">
            <Link
              to="/admin/movies/genre"
              className="block p-2 ml-10 mb-10 text-black"
            >
              Create Genre
            </Link>
          </li>

          <li className="mt-18 ml-10 text-lg bg-gradient-to-b from-green-500 to-lime-400 rounded-full -translate-x-6">
            <Link
              to="/admin/movies-list"
              className="block p-2 ml-10 mb-10 text-black"
            >
              Update Movie
            </Link>
          </li>

          <li className="mt-18 ml-10 text-lg bg-gradient-to-b from-green-500 to-lime-400 rounded-full -translate-x-6">
            <Link
              to="/admin/movies/comments"
              className="block p-2 ml-10 mb-10 text-black"
            >
              Comments
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
