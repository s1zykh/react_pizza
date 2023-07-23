import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../utils/apiService";

const initialState = {
  sorting: [],
  sortingLoadingStatus: "idle",
  activeSorting: "popularity",
};

export const fetchSorting = createAsyncThunk("sorting/fetchSorting", () => {
  const api = new apiService();
  return api.fetchData("http://localhost:3001/sorting");
});

const sortingSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    sortingChanged: (state, action) => {
      state.activeSorting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSorting.pending, (state) => {
        state.sortingLoadingStatus = "loading";
      })
      .addCase(fetchSorting.fulfilled, (state, action) => {
        state.sortingLoadingStatus = "idle";
        state.sorting = action.payload;
      })
      .addCase(fetchSorting.rejected, (state) => {
        state.sortingLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = sortingSlice;

export default reducer;
export const { sortingChanged } = actions;
