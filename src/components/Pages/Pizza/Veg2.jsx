import React from "react";
import PizzaPage from "./PizzaPage";
import { Veg2Data } from "../../data/FoodData";

const Veg2 = () => {
  return (
    <div>
      <h2 id="Veg_2" className='category-header'>
         Veg 2 Pizza
      </h2>
      {Veg2Data.map((Pizza) => (
        <PizzaPage key={Pizza.id} {...Pizza} />
      ))}
    </div>
  );
};

export default Veg2;
