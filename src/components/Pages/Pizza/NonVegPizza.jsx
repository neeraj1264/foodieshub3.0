import React from "react";
import PizzaPage from "./PizzaPage";
import { NonVegPizzaData } from "../../data/FoodData";

const NonVegPizza = () => {
  return (
    <div>
      <h2 id="Non_Veg_Pizza" className='category-header'>
      Non Veg Pizza
      </h2>
      {NonVegPizzaData.map((Pizza) => (
        <PizzaPage key={Pizza.id} {...Pizza} />
      ))}
    </div>
  );
};

export default NonVegPizza;
