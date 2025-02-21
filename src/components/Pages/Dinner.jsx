import React from 'react';
import { DinnerData } from '../data/FoodData';
import PizzaPage from './Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Dinner = () => {
  
  return (
    <>
      <h2 id='dinner' className='category-header'>Delicious Dinner</h2>
      {renderCards(DinnerData)}
    </>
  );
};

export default Dinner;
