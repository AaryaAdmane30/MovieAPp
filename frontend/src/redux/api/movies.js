import { apiSlice } from "./apiSlice.js";
import { MOVIE_URL, UPLOAD_URL } from "../constant.js";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL MOVIE:
    getAllMovies: builder.query({
      query: () => `${MOVIE_URL}/all-movies`,
    }),
    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${MOVIE_URL}/create-movie`,
        method: "POST",
        body: newMovie,
      }),
    }),

    //UPDATE MOVIE:
    updateMovie: builder.mutation({
      query: ({ id, updateMovie }) => ({
        url: `${MOVIE_URL}/update-movie/${id}`,
        method: "PUT",
        body: updateMovie,
      }),
    }),

    //  ALL MOVIE REVIEW:
    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/reviews`,
        method: "POST",
        body: { rating, comment },
      }),
    }),

    //  DELTETE COMMENT :

    deleteComment: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/${movieId}/delete-comment/${reviewId}`,
        //  delete should not hve request body pass it in URl
        method: "DELETE",
      }),
    }),

    //  DELETE MOVIE :
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/delete-movie/${id}`,
        method: "DELETE",
      }),
    }),

    //  GET SPECIFIC MOVIE :
    getSpecificMovie: builder.query({
      query: (id) => `${MOVIE_URL}/specific-movie/${id}`,
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
    //  GET NEW MOVIE :
    getNewMovie: builder.query({
      query: () => `${MOVIE_URL}/new-movie`,
    }),
    getTopMovies: builder.query({
      query: () => `${MOVIE_URL}/top-movies`,
    }),
    getRandomMovies: builder.query({
      query: () => `${MOVIE_URL}/random-movie`,
    }),
  }),
});

//  HOOKS :
export const {
  useGetAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useAddMovieReviewMutation,
  useDeleteCommentMutation,
  useDeleteMovieMutation,
  useGetSpecificMovieQuery,
  useUploadImageMutation,
  useGetNewMovieQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} = moviesApiSlice;
