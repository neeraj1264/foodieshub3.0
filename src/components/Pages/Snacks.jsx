import React from 'react';
import { SnacksData } from '../data/FoodData';
import PizzaPage from './Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Snacks = () => {
  
  return (
    <>
      <h2 id='snacks' className='category-header'>Delicious Snacks</h2>
      {renderCards(SnacksData)}
    </>
  );
};

export default Snacks;
