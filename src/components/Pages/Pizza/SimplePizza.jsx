import React from "react";
import PizzaPage from "./PizzaPage";
import { simplepizzadata } from "../../data/FoodData";

const SimplePizza = ({ menu }) => {
  return (
    <div>
      <h2 id="Simple_Pizza" className='category-header'>
        Simple Veg Pizza
      </h2>
      {simplepizzadata.map((Pizza) => (
        <PizzaPage key={Pizza.id} {...Pizza} />
      ))}
    </div>
  );
};

export default SimplePizza;
