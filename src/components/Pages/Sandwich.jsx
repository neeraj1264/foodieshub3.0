import React from 'react';
import { SandwichData } from '../data/FoodData';
import PizzaPage from './Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Sandwich = () => {
  
  return (
    <>
      <h2 id='sandwich' className='category-header'>Delicious Sandwich</h2>
      {renderCards(SandwichData)}
    </>
  );
};

export default Sandwich;
