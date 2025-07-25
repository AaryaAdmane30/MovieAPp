import { apiSlice } from "./apiSlice.js";

import { GENRE_URL } from "../constant.js";

//  mutation refers to operations that modify data on the server creating, updating, or deleting resources. These operations cause changes in the backend and often require sending data in the request body.
export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (newGenre) => ({
        url: `${GENRE_URL}`,
        method: "POST",
        body: newGenre,
      }),
    }),

    updateGenre: builder.mutation({
      query: ({ id, updateGenre }) => ({
        url: `${GENRE_URL}/${id}`,
        method: "PUT",
        body: updateGenre,
      }),
    }),

    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    fetchGenre: builder.query({
      query: () => `${GENRE_URL}/genres`,
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenreQuery,
} = genreApiSlice;
