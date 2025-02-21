import React from 'react';
import { DinnerData } from '../data/FoodData';
import PizzaPage from './Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Naan = () => {
  
  return (
    <>
      <h2 id='naan' className='category-header'>Hot Naan</h2>
      {renderCards(DinnerData)}
    </>
  );
};

export default Naan;
