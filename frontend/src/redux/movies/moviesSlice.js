import { createSlice } from "@reduxjs/toolkit";

// createSlice is a Redux Toolkit function that simplifies Redux state management.
// It automatically generates action creators and reducers.

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesFilter: {
      searchTerm: "",
      selectedGenre: null,
      selectedYear: "",
      selectedSort: [],
    },
    filteredMovies: [],
    movieYears: [],
    uniqueYears: [],
  },
  reducers: {
    setMoviesFilter: (state, action) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },
    setFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },
    setMoviesYears: (state, action) => {
      state.movieYears = action.payload;
    },

    setUniqueYears: (state, action) => {
      state.uniqueYears = action.payload;
    },
  },
});

export const {
  setFilteredMovies,
  setMoviesFilter,
  setUniqueYears,
  setMoviesYears,
} = moviesSlice.actions;
export default moviesSlice.reducer;
