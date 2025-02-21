import React from "react";
import PizzaPage from "./PizzaPage";
import { Veg3Data } from "../../data/FoodData";

const Veg3 = () => {
  return (
    <div>
      <h2 id="Veg_3" className='category-header'>
         Veg 3 Pizza
      </h2>
      {Veg3Data.map((Pizza) => (
        <PizzaPage key={Pizza.id} {...Pizza} />
      ))}
    </div>
  );
};

export default Veg3;
