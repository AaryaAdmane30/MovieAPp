import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="flex justify-center items-center m-6">
      <div className="relative group w-[26rem]  mt-4 h-[25rem] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <Link to={`/movies/${movie._id}`} className="block w-full h-full">
          {/* Centering the Image */}
          <div className="flex justify-center items-center h-full">
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-[22rem] object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
          {/* Overlay for Text */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
            <p className="text-white text-xl font-semibold">{movie.name}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

// import React from "react";
// import { Link } from "react-router-dom";

// export default function MovieCard({ movie }) {
//   return (
//     <div key={movie._id} className="relative group m-[2rem]">
//       <Link to={`/movies/${movie._id}`}>
//         <img
//           src={movie.image}
//           alt={movie.name}
//           className="w-[20rem] h-[20rem] rounded m-0 p-0 transition duration-300 ease-in-out transform group-hover:opacity-50"
//         />
//       </Link>
//       <p className="absoulte top-[85%] left-[2rem] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
//         {movie.name}
//       </p>
//     </div>
//   );
// }
