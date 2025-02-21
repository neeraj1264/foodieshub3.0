import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { IcecreamData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Icecream = () => {
  
  return (
    <>
      <h2 id='Icecream' className='category-header'>Icecream</h2>
      {renderCards(IcecreamData)}
    </>
  );
};

export default Icecream;
