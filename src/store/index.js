import { configureStore } from "@reduxjs/toolkit";
import filters from "../components/pizzasFilters/filtersSlice";
import sorting from "../components/pizzasSorting/sortingSlice";
import pizzas from "../components/pizzasList/pizzasListSlice";
import characteristic from "../components/pizzaItem/pizzaItemSlice";
const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: { filters, sorting, pizzas, characteristic },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
