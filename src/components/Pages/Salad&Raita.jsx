import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { SaladandRaitaData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const SaladandRayta = () => {
  
  return (
    <>
      <h2 id='SaladandRayta' className='category-header'>Salad & Rayta</h2>
      {renderCards(SaladandRaitaData)}
    </>
  );
};

export default SaladandRayta;
