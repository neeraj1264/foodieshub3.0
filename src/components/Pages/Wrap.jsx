import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { WrapData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Wrap = () => {
  
  return (
    <>
      <h2 id='Wrap' className='category-header'> Wrap</h2>
      {renderCards(WrapData)}
    </>
  );
};

export default Wrap;
