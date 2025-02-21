import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { VegSnacksData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const VegSnacks = () => {
  
  return (
    <>
      <h2 id='VegSnacks' className='category-header'>VegSnacks</h2>
      {renderCards(VegSnacksData)}
    </>
  );
};

export default VegSnacks;
