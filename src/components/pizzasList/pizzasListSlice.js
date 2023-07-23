import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../utils/apiService";

const initialState = {
  pizzas: [],
  pizzasLoadingStatus: "idle",
};

export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzas", () => {
  const api = new apiService();
  return api.fetchData("http://localhost:3001/pizzas");
});

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    activeChange: {
      reducer: (state, action) => {
        const { pizzaId, characteristicName, nameActive } = action.payload;
        state.pizzas.forEach((item) => {
          if (item.id === pizzaId) {
            item[nameActive] = characteristicName;
          }
        });
      },
      prepare: (pizzaId, characteristicName, nameActive) => {
        return { payload: { pizzaId, characteristicName, nameActive } };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.pizzasLoadingStatus = "loading";
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzasLoadingStatus = "idle";
        state.pizzas = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.pizzasLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = pizzasSlice;
export const { activeChange } = actions;
export default reducer;
