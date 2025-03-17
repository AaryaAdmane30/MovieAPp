import React from "react";
import { Link } from "react-router-dom";

export default function MovieTabs({
  userInfo,
  submitHandler,
  comment,
  setComment,
  movie,
}) {
  return (
    <div>
      {/* Review Form */}
      <section className="ml-[15rem]">
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <div className="my-2">
              <label
                htmlFor="comment"
                className="block text-xl mb-2 font-extrabold "
              >
                Write Your Review
              </label>
              <textarea
                id="comment"
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-2 border rounded-lg xl:w-[35rem] text-black"
              ></textarea>
              <button
                type="submit"
                disabled={!comment.trim()}
                className="bg-blue-600 ml-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200 cursor-pointer hover:bg-blue-600 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <p>
            Please{" "}
            <Link to="/login" className="text-blue-400 underline">
              Sign In
            </Link>{" "}
            to write a review.
          </p>
        )}
      </section>

      {/* Reviews Section */}
      <section className="my-[3rem] ml-[15rem]">
        {/* Show message if no reviews exist */}
        {(!movie?.reviews || movie.reviews.length === 0) && <p>No Reviews</p>}

        {/* List of Reviews */}
        <div>
          {movie?.reviews?.map((review) => (
            <div
              key={review._id}
              className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]"
            >
              <div className="flex justify-between">
                <strong className="text-[#B0B0B0]">
                  {review.name || "Anonymous"}
                </strong>
                <p className="text-[#B0B0B0]">
                  {review.createdAt
                    ? review.createdAt.substring(0, 10)
                    : "Unknown Date"}
                </p>
              </div>
              <p className="my-4">{review.comment || "No comment provided."}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
