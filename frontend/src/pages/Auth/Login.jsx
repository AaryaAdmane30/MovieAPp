import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader.jsx";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/userSlice.js";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-4xl flex bg-gray-800 bg-opacity-90 shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex w-1/2">
          <img
            src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop"
            alt="background"
            className="object-cover w-full h-auto"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>

          <form onSubmit={submitHandler} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-md text-white font-bold hover:opacity-90 transition"
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>
            {isLoading && <Loader />}
          </form>

          <p className="text-center text-sm mt-4">
            New here?{" "}
            <Link to="/register" className="text-yellow-400 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
