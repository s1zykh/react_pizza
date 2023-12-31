import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../utils/apiService";

const initialState = {
  filters: [],
  filtersLoadingStatus: "idle",
  activeFilter: "all",
};

export const fetchFilters = createAsyncThunk("filters/fetchFilters", () => {
  const api = new apiService();
  return api.fetchData("http://localhost:3001/filters");
});

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filtersChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = "idle";
        state.filters = action.payload;
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = filtersSlice;

export default reducer;
export const { filtersChanged } = actions;
