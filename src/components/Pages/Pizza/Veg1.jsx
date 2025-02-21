import React from "react";
import PizzaPage from "./PizzaPage";
import { Veg1Data } from "../../data/FoodData";

const Veg1 = () => {
  return (
    <div>
      <h2 id="Veg_1" className='category-header'>
         Veg 1 Pizza
      </h2>
      {Veg1Data.map((Pizza) => (
        <PizzaPage key={Pizza.id} {...Pizza} />
      ))}
    </div>
  );
};

export default Veg1;
