import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { fetchFilters, filtersChanged } from "./filtersSlice";
import "./pizzasFilters.scss";
const PizzasFilters = () => {
  const { filters, activeFilter } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <div className="fz-16">Фильтры не загрузились</div>;
    }

    return arr.map(({ name, label }) => {
      let btnClass = classNames("fz-16", "filters__group-item", {
        active: name === activeFilter,
      });

      return (
        <button
          key={name}
          id={name}
          className={btnClass}
          onClick={() => dispatch(filtersChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <section className="filters">
      <div className="filters__group">{elements}</div>
    </section>
  );
};

export default PizzasFilters;
