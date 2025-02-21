import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { SandwichData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Sandwich = () => {
  
  return (
    <>
      <h2 id='Sandwich' className='category-header'>Sandwich</h2>
      {renderCards(SandwichData)}
    </>
  );
};

export default Sandwich;
