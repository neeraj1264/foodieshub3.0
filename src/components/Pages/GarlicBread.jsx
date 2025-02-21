import React from 'react';
import { GarlicBreadData } from '../data/FoodData';
import PizzaPage from './Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const GarlicBread = () => {
  
  return (
    <>
      <h2 id='garlic' className='category-header'>Delicious Garlic Bread</h2>
      {renderCards(GarlicBreadData)}
    </>
  );
};

export default GarlicBread;
