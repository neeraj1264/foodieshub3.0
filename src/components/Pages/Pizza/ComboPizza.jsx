import React from "react";
import PizzaPage from "./PizzaPage";
import { CombopizzaData } from "../../data/FoodData";

const Combopizza = () => {
  return (
    <div>
      <h2 id="Combo_Pizza" className='category-header'>
       Pizza Combo
      </h2>
      {CombopizzaData.map((Pizza) => (
        <PizzaPage key={Pizza.id} {...Pizza} />
      ))}
    </div>
  );
};

export default Combopizza;
