import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { ShakeData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Shake = () => {
  
  return (
    <>
      <h2 id='Shake' className='category-header'>Shake</h2>
      {renderCards(ShakeData)}
    </>
  );
};

export default Shake;
