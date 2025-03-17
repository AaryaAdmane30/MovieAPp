// import React from "react";

// import { useGetUsersQuery } from "../../../../redux/api/userSlice";
// import PrimaryCard from "./PrimaryCard";

// export default function RealTimeCard() {
//   const { data: visitors } = useGetUsersQuery();

//   return (
//     <div className="w-[20rem] mt-10 bg-[#282828] text-[#fff] rounded-lg shadow-lg p-4">
//       <h2 className="text-2xl font-bold mb-2">Realtime</h2>
//       <p className="text-gray-500 mb-4">Update Live</p>
//       <div className="border-t border-[#666]"></div>
//       <h2 className="text-2xl font-bold mb-2 ">{visitors?.length}</h2>
//       <p className="text-gray-500 mb-2">Subscribe</p>
//       <hr />
//       <PrimaryCard />
//     </div>
//   );
// }

import React from "react";
import { useGetUsersQuery } from "../../../../redux/api/userSlice";
import PrimaryCard from "./PrimaryCard";

export default function RealTimeCard() {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-[22rem] mt-10 bg-gradient-to-br from-[#1e1e1e] to-[#282828] text-white rounded-2xl shadow-lg p-6 border border-[#333] backdrop-blur-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Realtime</h2>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></span>
          <p className="text-gray-400 text-sm">Live</p>
        </div>
      </div>

      <p className="text-gray-500 mb-4">Update Live</p>
      <div className="border-t border-[#444] my-3"></div>

      {/* Visitor Count */}
      <h2 className="text-3xl font-extrabold text-center">
        {visitors?.length || 0}
      </h2>
      <p className="text-gray-500 text-center mb-4">Total Visitors</p>

     
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
        Subscribe
      </button>

      <hr className="my-4 border-[#444]" />

     
      <PrimaryCard />
    </div>
  );
}
