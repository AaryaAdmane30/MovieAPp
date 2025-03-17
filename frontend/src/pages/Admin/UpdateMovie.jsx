//

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUploadImageMutation,
  useDeleteMovieMutation,
  useUpdateMovieMutation,
} from "../../redux/api/movies.js";
import { toast } from "react-toastify";

export default function UpdateMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();
  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast
      ) {
        toast.error("Please Fill in All Required Fields");
        return;
      }
      let uploadImagePath = movieData.image;
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to Upload Image", uploadImageErrorDetails);
          toast.error("Failed To Upload Image");
        }
      }
      await updateMovie({
        id: id,
        updateMovie: {
          ...movieData,
          image: uploadImagePath,
        },
      });
      navigate("/movies");
    } catch (error) {
      console.error("Failed To Update Movie:", error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      toast.success("Movie deleted Successfully");
      await deleteMovie(id);
      navigate("/movies");
    } catch (error) {
      console.error("Failed To Delete Movie:", error);
      toast.error(`Failed To Delete Movie: ${error?.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="bg-gray-800 text-white shadow-xl rounded-xl p-8 w-full max-w-2xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Movie</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-md px-3 py-2 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Year:</label>
            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-md px-3 py-2 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Detail:</label>
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-md px-3 py-2 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Cast (comma-separated):
            </label>
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(",")}
              onChange={(e) =>
                setMovieData({ ...movieData, cast: e.target.value.split(",") })
              }
              className="w-full border border-gray-600 rounded-md px-3 py-2 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-300 border border-gray-600 rounded-md cursor-pointer bg-gray-700 focus:outline-none"
            />
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="mt-2 w-full h-40 object-cover rounded-md border border-gray-600"
              />
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleUpdateMovie}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full mr-2"
              disabled={isUpdatingMovie || isUploadingImage}
            >
              {isUpdatingMovie || isUploadingImage
                ? "Updating..."
                : "Update Movie"}
            </button>
            <button
              type="button"
              onClick={handleDeleteMovie}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full ml-2"
              disabled={isUpdatingMovie || isUploadingImage}
            >
              {isUpdatingMovie || isUploadingImage
                ? "Deleting..."
                : "Delete Movie"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
