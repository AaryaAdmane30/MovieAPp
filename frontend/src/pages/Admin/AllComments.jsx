import React from "react";
import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies.js";
import { toast } from "react-toastify";

export default function AllComments() {
  const { data: movie, refetch } = useGetAllMoviesQuery();
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId }).unwrap();
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error While Deleting Comment:", error);
      toast.error("Comment Not Deleted");
    }
  };

  return (
    <div className="mt-16 px-6">
      {movie?.map((m) => (
        <section
          key={m._id}
          className="flex flex-col justify-center items-center"
        >
          {m?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-lg my-4 shadow-md transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {/* Profile Placeholder */}
                  <div className="w-10 h-10 bg-gray-600 text-gray-200 font-bold rounded-full flex items-center justify-center text-lg">
                    {review.name?.charAt(0).toUpperCase()}
                  </div>
                  <strong className="text-gray-200">{review.name}</strong>
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Comment */}
              <p className="mt-4 text-gray-300 leading-relaxed">
                {review.comment}
              </p>

              {/* Delete Button */}
              <button
                className="mt-4 text-red-500 font-semibold hover:text-red-400 transition-colors duration-200"
                onClick={() => handleDeleteComment(m._id, review._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
