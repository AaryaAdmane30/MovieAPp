import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader.jsx";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/userSlice.js";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  console.log("Redirect value:", redirect); // Debugging log

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered!");
      } catch (err) {
        toast.error(err.data.message || "Registration failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-4xl flex bg-gray-800 bg-opacity-90 shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex w-1/2">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
            alt="background"
            className="object-cover w-full h-auto"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-semibold text-center mb-6">Register</h1>

          <form onSubmit={submitHandler} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 rounded-md bg-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md bg-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-md text-white font-bold hover:opacity-90 transition"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            {isLoading && <Loader />}
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-yellow-400 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
