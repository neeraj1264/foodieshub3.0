import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { SaladData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Salad = () => {
  
  return (
    <>
      <h2 id='Salad' className='category-header'>Salad</h2>
      {renderCards(SaladData)}
    </>
  );
};

export default Salad;
