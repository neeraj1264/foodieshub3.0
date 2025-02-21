import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { CoffeeData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Coffee = () => {
  
  return (
    <>
      <h2 id='Coffee' className='category-header'>Coffee</h2>
      {renderCards(CoffeeData)}
    </>
  );
};

export default Coffee;
