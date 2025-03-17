import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userSlice.js";
import { logout } from "../../redux/features/auth/authSlice";

export default function Navigation() {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black shadow-lg border-b border-gray-800 z-50">
      <nav className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-xl font-bold tracking-wider hover:text-gray-300 transition"
        >
          🎬 MovieHub
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <Link
            to="/"
            className="flex flex-col items-center text-white-400 hover:text-white transition duration-200"
          >
            <AiOutlineHome size={26} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/movies"
            className="flex flex-col items-center text-white-400 hover:text-white transition duration-200"
          >
            <MdOutlineLocalMovies size={26} />
            <span className="text-xs mt-1">Movies</span>
          </Link>
        </div>

        {/* User Actions */}
        <div className="relative">
          {userInfo ? (
            <button
              onClick={toggleDropdown}
              className="flex items-center text-white px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              <span className="text-sm font-medium">{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-2 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <AiOutlineLogin size={26} />
                <span className="text-xs mt-1">Login</span>
              </Link>
              <Link
                to="/register"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <AiOutlineUserAdd size={26} />
                <span className="text-xs mt-1">Register</span>
              </Link>
            </div>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && userInfo && (
            <ul className="absolute right-0 mt-2 bg-gray-900 text-white shadow-lg rounded-md w-40 overflow-hidden border border-gray-700">
              {userInfo?.isAdmin && (
                <li>
                  <Link
                    to="/admin/movies/dashboard"
                    className="block px-4 py-2 hover:bg-blue-800 transition"
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-blue-800 transition"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

// import React, { useState } from "react";
// import {
//   AiOutlineHome,
//   AiOutlineLogin,
//   AiOutlineUserAdd,
// } from "react-icons/ai";
// import { MdOutlineLocalMovies } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useLogoutMutation } from "../../redux/api/userSlice.js";
// import { logout } from "../../redux/features/auth/authSlice";

// export default function Navigation() {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [logoutApiCall] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full bg-black shadow-lg border-b border-gray-800 z-50">
//       <nav className="flex justify-between items-center px-6 py-3">
//         {/* Left: Logo */}
//         <Link to="/" className="text-white text-xl font-bold tracking-wider">
//           🎬 MovieHub
//         </Link>

//         {/* Center: Navigation Links */}
//         <div className="flex space-x-8">
//           <Link
//             to="/"
//             className="flex flex-col items-center text-gray-400 hover:text-white transition duration-200"
//           >
//             <AiOutlineHome size={26} />
//             <span className="text-xs mt-1">Home</span>
//           </Link>

//           <Link
//             to="/movies"
//             className="flex flex-col items-center text-gray-400 hover:text-white transition duration-200"
//           >
//             <MdOutlineLocalMovies size={26} />
//             <span className="text-xs mt-1">Movies</span>
//           </Link>
//         </div>

//         {/* Right: User Actions */}
//         <div className="relative">
//           {userInfo ? (
//             <button
//               onClick={toggleDropdown}
//               className="flex items-center text-white px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-200"
//             >
//               <span className="text-sm font-medium">{userInfo.username}</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`h-4 w-4 ml-2 transition-transform ${
//                   dropdownOpen ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="white"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//           ) : (
//             <div className="flex space-x-4">
//               <Link
//                 to="/login"
//                 className="text-gray-400 hover:text-white transition duration-200"
//               >
//                 <AiOutlineLogin size={26} />
//                 <span className="text-xs mt-1">Login</span>
//               </Link>
//               <Link
//                 to="/register"
//                 className="text-gray-400 hover:text-white transition duration-200"
//               >
//                 <AiOutlineUserAdd size={26} />
//                 <span className="text-xs mt-1">Register</span>
//               </Link>
//             </div>
//           )}

//           {/* Dropdown Menu */}
//           {dropdownOpen && userInfo && (
//             <ul className="absolute right-0 mt-2 bg-gray-900 text-white shadow-lg rounded-md w-40 overflow-hidden border border-gray-700">
//               {userInfo?.isAdmin && (
//                 <li>
//                   <Link
//                     to="/admin/movies/dashboard"
//                     className="block px-4 py-2 hover:bg-gray-800"
//                   >
//                     Admin Dashboard
//                   </Link>
//                 </li>
//               )}

//               <li>
//                 <Link
//                   to="/profile"
//                   className="block px-4 py-2 hover:bg-gray-800"
//                 >
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <button
//                   onClick={logoutHandler}
//                   className="block w-full text-left px-4 py-2 hover:bg-red-600 transition"
//                 >
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           )}
//         </div>
//       </nav>
//     </div>
//   );
// }

//
// import React, { useState } from "react";
// import {
//   AiOutlineHome,
//   AiOutlineLogin,
//   AiOutlineUserAdd,
// } from "react-icons/ai";
// import { MdOutlineLocalMovies } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useLogoutMutation } from "../../redux/api/userSlice.js"; // Custom API Hook
// import { logout } from "../../redux/features/auth/authSlice";

// export default function Navigation() {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [logoutApiCall] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 border border-gray-700 w-[25rem] px-6 py-4 rounded-xl shadow-lg">
//       <section className="flex justify-between items-center">
//         {/* Home Link */}
//         <Link to="/" className="flex flex-col items-center group">
//           <AiOutlineHome
//             className="text-white group-hover:text-blue-400 transition"
//             size={28}
//           />
//           <span className="text-xs text-gray-400 group-hover:text-white mt-1">
//             Home
//           </span>
//         </Link>

//         {/* Movies Link */}
//         <Link to="/movies" className="flex flex-col items-center group">
//           <MdOutlineLocalMovies
//             className="text-white group-hover:text-blue-400 transition"
//             size={28}
//           />
//           <span className="text-xs text-gray-400 group-hover:text-white mt-1">
//             Movies
//           </span>
//         </Link>

//         {/* User Dropdown */}
//         <div className="relative">
//           {userInfo ? (
//             <button
//               onClick={toggleDropdown}
//               className="flex flex-col items-center text-white group"
//             >
//               <span className="text-sm font-medium">{userInfo.username}</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`h-4 w-4 transition-transform ${
//                   dropdownOpen ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="white"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//           ) : (
//             <div className="flex space-x-4">
//               <Link to="/login" className="flex flex-col items-center group">
//                 <AiOutlineLogin
//                   className="text-white group-hover:text-blue-400 transition"
//                   size={28}
//                 />
//                 <span className="text-xs text-gray-400 group-hover:text-white mt-1">
//                   Login
//                 </span>
//               </Link>
//               <Link to="/register" className="flex flex-col items-center group">
//                 <AiOutlineUserAdd
//                   className="text-white group-hover:text-blue-400 transition"
//                   size={28}
//                 />
//                 <span className="text-xs text-gray-400 group-hover:text-white mt-1">
//                   Register
//                 </span>
//               </Link>
//             </div>
//           )}

//           {dropdownOpen && userInfo && (
//             <ul className="z-20 bottom-full mb-2 absolute right-0 mt-2 bg-white text-gray-600 w-40 shadow-md rounded-md">
//               {userInfo?.isAdmin && (
//                 <li>
//                   <Link
//                     to="/admin/movies/dashboard"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Admin Dashboard
//                   </Link>
//                 </li>
//               )}

//               <li>
//                 <Link
//                   to="/profile"
//                   className="block px-4 py-2 hover:bg-gray-100"
//                 >
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <button
//                   onClick={logoutHandler}
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }
