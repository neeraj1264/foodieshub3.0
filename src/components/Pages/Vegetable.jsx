import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { VegetablesData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Vegetable = () => {
  
  return (
    <>
      <h2 id='Vegetable' className='category-header'> Vegetable</h2>
      {renderCards(VegetablesData)}
    </>
  );
};

export default Vegetable;
