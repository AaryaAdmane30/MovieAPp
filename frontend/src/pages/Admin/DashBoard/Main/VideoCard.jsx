// import React from "react";

// export default function VideoCard({ image, title, date, comments }) {
//   return (
//     <>
//       <div className="flex items-center w-[90%] mt-5">
//         <div>
//           <img src={image} alt="Card Imge" className="h-[3rem]" />
//         </div>
//       </div>
//     </>
//   );
// }import React from "react";
import React from "react";

export default function VideoCard({ image, title, date, comments }) {
  const imageUrl = image?.startsWith("uploads")
    ? `http://localhost:3000/${image.replace(/\\/g, "/")}`
    : image;

  return (
    <div className="flex items-center w-full mt-5">
      {/* Image Section */}
      <div>
        <img
          src={imageUrl || "default-image.jpg"}
          alt={title || "Movie Thumbnail"}
          className="h-[10rem] object-cover rounded-md"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "default-image.jpg";
          }}
        />
      </div>

      {/* Title and Date Section */}
      <div className="ml-4 text-white">
        <h3 className="font-bold">{title}</h3>
        <p className="text-gray-500 mb-3">{date}</p>
      </div>

      <div className="ml-auto text-white">
        <p className="font-bold">{comments}</p>
      </div>
    </div>
  );
}
