import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../utils/apiService";

const initialState = {
  characteristic: {},
  characteristicLoadingStatus: "idle",
};

export const fetchCharacteristic = createAsyncThunk(
  "characteristic/fetchCharacteristic",
  () => {
    const api = new apiService();
    return api.fetchData("http://localhost:3001/characteristic");
  }
);

const characteristicSlice = createSlice({
  name: "characteristic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacteristic.pending, (state) => {
        state.characteristicLoadingStatus = "loading";
      })
      .addCase(fetchCharacteristic.fulfilled, (state, action) => {
        state.characteristicLoadingStatus = "idle";
        state.characteristic = action.payload;
      })
      .addCase(fetchCharacteristic.rejected, (state) => {
        state.characteristicLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});
const { reducer } = characteristicSlice;
export default reducer;
