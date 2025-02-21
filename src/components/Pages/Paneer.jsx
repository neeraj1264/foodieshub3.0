import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { PaneerData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Paneer = () => {
  
  return (
    <>
      <h2 id='Paneer' className='category-header'> Paneer</h2>
      {renderCards(PaneerData)}
    </>
  );
};

export default Paneer;
