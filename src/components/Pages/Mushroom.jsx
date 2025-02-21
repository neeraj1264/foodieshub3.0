import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { MushromData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Mushroom = () => {
  
  return (
    <>
      <h2 id='Mushroom' className='category-header'> Mushroom</h2>
      {renderCards(MushromData)}
    </>
  );
};

export default Mushroom;
