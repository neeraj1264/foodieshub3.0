import React from 'react';
import { NonVegMainData } from '../data/FoodData';
import PizzaPage from './Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const NonVegMain = () => {
  
  return (
    <>
      <h2 id='Non_Veg_Main' className='category-header'>Non_Veg_Main</h2>
      {renderCards(NonVegMainData)}
    </>
  );
};

export default NonVegMain;
