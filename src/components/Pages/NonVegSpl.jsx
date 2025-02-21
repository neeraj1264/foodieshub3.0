import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { NonVegSplData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const NonVegSpl = () => {
  
  return (
    <>
      <h2 id='Non_Veg_Special' className='category-header'>Non_Veg_Special</h2>
      {renderCards(NonVegSplData)}
    </>
  );
};

export default NonVegSpl;
