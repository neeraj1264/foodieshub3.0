import React from "react";
import PizzaPage from "./PizzaPage";
import { TasteOfIndiaData } from "../../data/FoodData";

const TasteOfIndia = () => {
  return (
    <div>
      <h2 id="Taste_Of_India" className='category-header'>
      Taste Of India Pizza
      </h2>
      {TasteOfIndiaData.map((Pizza) => (
        <PizzaPage key={Pizza.id} {...Pizza} />
      ))}
    </div>
  );
};

export default TasteOfIndia;
