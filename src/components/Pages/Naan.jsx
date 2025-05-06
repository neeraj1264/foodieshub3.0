import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { NaanData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Naan = () => {
  
  return (
    <>
      <h2 id='naan' className='category-header'>Hot Naan</h2>
      {renderCards(NaanData)}
    </>
  );
};

export default Naan;
