import React from "react";
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies.js";

import { useGetUsersQuery } from "../../../../redux/api/userSlice.js";

export default function Main() {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews) || [];
  const sumOfCommentsLength = totalCommentsLength.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div className="bg-[#121212] min-h-screen p-10">
      <section className="flex justify-around my-10">
        <div className="ml-[14rem] mt-10">
          <div className="-translate-x-4 flex gap-6">
            <SecondaryCard
              pill="Users"
              content={visitors?.length || 0}
              info="20.23k more than usual"
              gradient="from-blue-500 to-indigo-500"
            />

            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength || 0}
              info="742.9 more than usual"
              gradient="from-purple-500 to-pink-500"
            />

            <SecondaryCard
              pill="Movies"
              content={allMovies?.length || 0}
              info="368+ more than usual"
              gradient="from-green-500 to-lime-400"
            />
          </div>
          <div className="flex justify-between w-[90%] text-white mt-10 font-bold ml-auto">
            <p>Top Content</p>
            <p>Comments</p>
          </div>

          {topMovies?.map((movie) => {
            return (
              <VideoCard
                key={movie._id}
                image={movie.image}
                title={movie.name}
                date={movie.year}
                comments={movie.numReviews}
              />
            );
          })}
        </div>

        <div>
          <RealTimeCard />
        </div>
      </section>
    </div>
  );
}
