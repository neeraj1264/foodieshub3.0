import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { RotiData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Roti = () => {
  
  return (
    <>
      <h2 id='Roti' className='category-header'>Roti</h2>
      {renderCards(RotiData)}
    </>
  );
};

export default Roti;
