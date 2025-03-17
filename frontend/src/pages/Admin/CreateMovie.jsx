import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenreQuery } from "../../redux/api/genre";

export default function CreateMovie() {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: "",
    year: "",
    detail: "",
    cast: [],
    rating: "",
    image: null,
    genre: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const [createMovie, { isLoading: isCreatingMovie }] =
    useCreateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenreQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: name === "cast" ? value.split(",") : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    if (
      !movieData.name ||
      !movieData.year ||
      !movieData.detail ||
      !selectedImage
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      let uploadedImagePath = null;
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          toast.error("Failed to upload image");
          return;
        }
      }

      await createMovie({ ...movieData, image: uploadedImagePath });
      navigate("/admin/movies-list");

      setMovieData({
        name: "",
        year: "",
        detail: "",
        cast: [],
        rating: "",
        image: null,
        genre: genres[0]?._id || "",
      });
      setSelectedImage(null);
      toast.success("Movie Added To Database");
    } catch (error) {
      toast.error("Failed to create movie");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">Create Movie</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Movie Name"
            value={movieData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="year"
            placeholder="Year"
            value={movieData.year}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="detail"
            placeholder="Movie Details"
            value={movieData.detail}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <input
            type="text"
            name="cast"
            placeholder="Cast (comma-separated)"
            value={movieData.cast.join(", ")}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            {isLoadingGenres ? (
              <option>Loading genres...</option>
            ) : (
              genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))
            )}
          </select>

          <div className="flex flex-col items-center">
            <label className="w-full p-2 border border-gray-600 rounded text-center bg-gray-700 text-white cursor-pointer">
              {selectedImage ? selectedImage.name : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={handleCreateMovie}
            disabled={isCreatingMovie || isUploadingImage}
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold disabled:bg-gray-500 transition"
          >
            {isCreatingMovie || isUploadingImage
              ? "Creating..."
              : "Create Movie"}
          </button>
        </div>
      </div>
    </div>
  );
}

// import React from "react";

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useCreateMovieMutation,
//   useUploadImageMutation,
// } from "../../redux/api/movies";
// import { toast } from "react-toastify";

// import { useFetchGenreQuery } from "../../redux/api/genre";

// export default function CreateMovie() {
//   const navigate = useNavigate();

//   const [movieData, setMovieData] = useState({
//     name: "",
//     year: 0,
//     detail: "",
//     cast: [],
//     rating: 0,
//     image: null,
//     genre: "",
//   });

//   const [selectedImage, setSelectedImage] = useState(null);

//   const [
//     createMovie,
//     { isLoading: isCreatingMovie, error: createMovieErrorDetail },
//   ] = useCreateMovieMutation();

//   const [
//     uploadImage,
//     { isLoading: isUploadingImage, error: uploadImageErrorDetails },
//   ] = useUploadImageMutation();

//   const { data: genres, isLoading: isLoadingGenres } = useFetchGenreQuery();

//   useEffect(() => {
//     if (genres) {
//       setMovieData((prevData) => ({
//         ...prevData,
//         genre: genres[0]?._id || "",
//       }));
//       console.log(genres[0]?._id);
//     }
//   }, [genres]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "genre") {
//       const selectedGenre = genres.find((genre) => genre.name === value);

//       setMovieData((prevData) => ({
//         ...prevData,
//         genre: selectedGenre ? selectedGenre._id : "",
//       }));
//     } else {
//       setMovieData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleCreateMovie = async () => {
//     try {
//       if (
//         !movieData.name ||
//         !movieData.year ||
//         !movieData.detail ||
//         !movieData.cast ||
//         !selectedImage
//       ) {
//         toast.error("Please fill all required fields");
//         return;
//       }

//       let uploadedImagePath = null;

//       if (selectedImage) {
//         const formData = new FormData();
//         formData.append("image", selectedImage);

//         const uploadImageResponse = await uploadImage(formData);

//         if (uploadImageResponse.data) {
//           uploadedImagePath = uploadImageResponse.data.image;
//         } else {
//           console.error("Failed to upload image: ", uploadImageErrorDetails);
//           toast.error("Failed to upload image");
//           return;
//         }

//         await createMovie({
//           ...movieData,
//           image: uploadedImagePath,
//         });

//         navigate("/admin/movies-list");

//         setMovieData({
//           name: "",
//           year: 0,
//           detail: "",
//           cast: [],
//           ratings: 0,
//           image: null,
//           genre: "",
//         });

//         toast.success("Movie Added To Database");
//       }
//     } catch (error) {
//       console.error("Failed to create movie: ", createMovieErrorDetail);
//       toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
//     }
//   };

//   return (
//     <div className="container flex justify-center items-center mt-4">
//       <form>
//         <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
//         <div className="mb-4">
//           <label className="block">
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={movieData.name}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Year:
//             <input
//               type="number"
//               name="year"
//               value={movieData.year}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Detail:
//             <textarea
//               name="detail"
//               value={movieData.detail}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full"
//             ></textarea>
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Cast (comma-separated):
//             <input
//               type="text"
//               name="cast"
//               value={movieData.cast.join(", ")}
//               onChange={(e) =>
//                 setMovieData({ ...movieData, cast: e.target.value.split(", ") })
//               }
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Genre:
//             <select
//               name="genre"
//               value={movieData.genre}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full bg-black"
//             >
//               {isLoadingGenres ? (
//                 <option>Loading genres...</option>
//               ) : (
//                 genres.map((genre) => (
//                   <option key={genre.id} value={genre.id}>
//                     {genre.name}
//                   </option>
//                 ))
//               )}
//             </select>
//           </label>
//         </div>

//         <div className="mb-4">
//           <label
//             style={
//               !selectedImage
//                 ? {
//                     border: "1px solid #888",
//                     borderRadius: "5px",
//                     padding: "8px",
//                   }
//                 : {
//                     border: "0",
//                     borderRadius: "0",
//                     padding: "0",
//                   }
//             }
//           >
//             {!selectedImage && "Upload Image"}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{ display: !selectedImage ? "none" : "block" }}
//             />
//           </label>
//         </div>

//         <button
//           type="button"
//           onClick={handleCreateMovie}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           disabled={isCreatingMovie || isUploadingImage}
//         >
//           {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
//         </button>
//       </form>
//     </div>
//   );
// }
