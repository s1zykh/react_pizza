import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createSelector } from "@reduxjs/toolkit";

import PizzaItem from "../pizzaItem/PizzaItem";
import { fetchPizzas } from "./pizzasListSlice";
import { fetchCharacteristic } from "../pizzaItem/pizzaItemSlice";
import Spinner from "../spinner/Spinner";

import "./pizzasList.scss";

const PizzasList = () => {
  const filteredSortedPizzas = createSelector(
    (state) => state.pizzas.pizzas,
    (state) => state.filters.activeFilter,
    (pizzas, filter) => {
      if (filter === "all") {
        return pizzas;
      } else {
        return pizzas.filter((item) => item.type === filter);
      }
    }
  );

  const pizzas = useSelector(filteredSortedPizzas);

  const { pizzasLoadingStatus } = useSelector((state) => state.pizzas);
  const { characteristic, characteristicLoadingStatus } = useSelector(
    (state) => state.characteristic
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacteristic());
    dispatch(fetchPizzas());
  }, []);

  if (
    pizzasLoadingStatus === "loading" ||
    characteristicLoadingStatus === "loading"
  ) {
    return <Spinner />;
  }

  const renderPizzasList = (data) => {
    if (data.length === 0) {
      return <h5>Пиццы не загрузились</h5>;
    }
    return data.map((item, i) => {
      return <PizzaItem {...item} key={i} characteristic={characteristic} />;
    });
  };

  const view = renderPizzasList(pizzas);

  return (
    <section className="pizzasList">
      <div className="container">
        <h3 className="pizzasList__text fz-32">Все пиццы</h3>
        <div className="pizzasList__wrapper">{view}</div>
      </div>
    </section>
  );
};

export default PizzasList;
