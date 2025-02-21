import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { SidesData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Sides = () => {
  
  return (
    <>
      <h2 id='Sides' className='category-header'>Sides</h2>
      {renderCards(SidesData)}
    </>
  );
};

export default Sides;
