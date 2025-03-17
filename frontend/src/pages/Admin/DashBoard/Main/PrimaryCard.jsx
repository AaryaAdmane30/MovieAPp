// import React from "react";
// import { useGetUsersQuery } from "../../../../redux/api/userSlice";

// export default function PrimaryCard() {
//   const { data: visitors } = useGetUsersQuery();
//   return (
//     <div className="w-[100%] h-[10%] bg-[#282828] text-white rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-4 ">Congratulations!</h2>
//       <p> You have {visitors?.length} new users, watching your content </p>
//     </div>
//   );
// }
import React from "react";
import { useGetUsersQuery } from "../../../../redux/api/userSlice";

export default function PrimaryCard() {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-full bg-[#1e1e1e] text-white rounded-xl shadow-lg p-6 border border-[#333] backdrop-blur-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">🎉 Congratulations!</h2>

      {/* User Count */}
      <p className="text-gray-400">
        You have{" "}
        <span className="font-semibold text-blue-400">
          {visitors?.length || 0}
        </span>{" "}
        new users watching your content.
      </p>

   
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent my-4"></div>

     
      <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300">
        View Users
      </button>
    </div>
  );
}
