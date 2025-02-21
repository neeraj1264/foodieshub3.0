import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { SizzlersData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Sizzlers = () => {
  
  return (
    <>
      <h2 id='Sizzlers' className='category-header'>Sizzlers</h2>
      {renderCards(SizzlersData)}
    </>
  );
};

export default Sizzlers;
