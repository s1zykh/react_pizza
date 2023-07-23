import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import { activeChange } from "../pizzasList/pizzasListSlice";

import imgage from "../../assets/img/pizzas/image.png";

import "./pizzaItem.scss";

const PizzaItem = ({
  name,
  type,
  src,
  price,
  id,
  characteristic,
  activeTesto,
  activeSize,
}) => {
  const dispatch = useDispatch();

  const renderCharacteristic = (data) => {
    if (data.testo.length === 0) {
      return <h5>Характеристики не загрузились</h5>;
    }
    const upperCharacteristic = data.testo.map(
      ({ name, label, price, characId }, i) => {
        const btnClasses = classNames("pizzaItem__characteristic-item", {
          activeItem: activeTesto === name,
        });
        return (
          <div
            className={btnClasses}
            key={i}
            onClick={() => {
              dispatch(activeChange(id, name, "activeTesto", price));
            }}
          >
            {label}
          </div>
        );
      }
    );
    const lowerCharacteristic = data.size.map(
      ({ name, label, price, characId }, i) => {
        const btnClasses = classNames("pizzaItem__characteristic-item", {
          activeItem: activeSize === name,
        });
        return (
          <div
            className={btnClasses}
            key={i}
            onClick={() => {
              dispatch(activeChange(id, name, "activeSize", price));
            }}
          >
            {label}
          </div>
        );
      }
    );

    return (
      <>
        <div className="pizzaItem__characteristic-wrapper">
          {upperCharacteristic}
        </div>
        <div className="pizzaItem__characteristic-wrapper">
          {lowerCharacteristic}
        </div>
      </>
    );
  };

  const view = renderCharacteristic(characteristic);

  return (
    <div className="pizzaItem">
      <img src={imgage} alt={`пицца ${name}`} className="pizzaItem__img" />
      <h4 className="pizzaItem__name fz-20">{name}</h4>
      <div className="pizzaItem__characteristic">{view}</div>
      <div className="pizzaItem__priceAdd">
        <div className="pizzaItem__priceAdd-price"> {price} ₽</div>
        <div className="pizzaItem__priceAdd-button">
          <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
          Добавить
          <div className="pizzaItem__priceAdd-button-count">2</div>
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
