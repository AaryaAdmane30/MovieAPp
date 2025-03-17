import React from "react";
import Header from "./Movies/Header";
import MovieConatinerPage from "./Movies/MovieConatinerPage";
export default function Home() {
  return (
    <>
      <Header />

      <section className="mt-[10rem]">
        <MovieConatinerPage />
      </section>
    </>
  );
}
