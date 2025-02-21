import React from "react";
import PizzaPage from "./PizzaPage";
import { PizzaData } from "../../data/FoodData";

const Pizza = () => {
  return (
    <div>
      <h2 id="pizza" className='category-header'>
        Delicious Pizza
      </h2>
      {PizzaData.map((Pizza) => (
        <PizzaPage key={Pizza.id} {...Pizza} />
      ))}
    </div>
  );
};

export default Pizza;
