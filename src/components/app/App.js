import PizzasHeader from "../pizzasHeader/PizzasHeader";
import PizzasFilters from "../pizzasFilters/PizzasFilters";
import PizzasSorting from "../pizzasSorting/PizzasSorting";
import PizzasList from "../pizzasList/PizzasList";

import "./App.scss";

function App() {
  return (
    <div className="wrapper">
      <PizzasHeader />
      <main className="main">
        <div className="ordering">
          <div className="container ordering__inner">
            <PizzasFilters />
            <PizzasSorting />
          </div>
          <PizzasList />
        </div>
      </main>
    </div>
  );
}

export default App;
