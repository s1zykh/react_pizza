import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import classNames from "classnames";

import { fetchSorting, sortingChanged } from "./sortingSlice";
import vector from "../../assets/icons/vector.svg";

import "./pizzasSorting.scss";

const PizzasSorting = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const menuRef = useRef(null);
  const { sorting, activeSorting, sortingLoadingStatus } = useSelector(
    (state) => state.sorting
  );

  useEffect(() => {
    dispatch(fetchSorting());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target !== menuRef.current && activeMenu) {
        setActiveMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeMenu]);

  const dispatch = useDispatch();

  const renderSorting = (data) => {
    if (data.length === 0) {
      return <h3>Сортировки не загрузились</h3>;
    }
    return data.map((item) => {
      return (
        <li
          className="sorting__menu-item"
          key={item.name}
          onClick={() => dispatch(sortingChanged(item.name))}
        >
          {item.label}
        </li>
      );
    });
  };

  const viewListSorting = renderSorting(sorting);
  const toggleActiveMenu = classNames("sorting__menu", {
    activeMenu: activeMenu === true,
  });

  return (
    <div className="sorting">
      <img src={vector} alt="vector" />
      <div className="sorting__options">
        <div className="sorting__options-text fz-14">
          Сортировка по:
          <span onClick={() => setActiveMenu(!activeMenu)} ref={menuRef}>
            {" "}
            популярности
          </span>
        </div>
        <ul className={toggleActiveMenu}>{viewListSorting}</ul>
      </div>
    </div>
  );
};
export default PizzasSorting;
