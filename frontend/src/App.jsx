import React from "react";
import { Outlet } from "react-router-dom"; 

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navigation from "./pages/Auth/Navigation";

export default function App() {
  return (
    //  addinh react Fragment <> dont want to add div here
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}
