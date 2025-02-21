import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { NonVegSoupData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const NonVegSoup = () => {
  
  return (
    <>
      <h2 id='Non_Veg_Soup' className='category-header'>Non_Veg_Soup</h2>
      {renderCards(NonVegSoupData)}
    </>
  );
};

export default NonVegSoup;
