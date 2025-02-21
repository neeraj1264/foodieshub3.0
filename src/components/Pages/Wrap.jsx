import React from 'react';
import { WrapData } from '../data/FoodData';
import PizzaPage from './Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Wrap = () => {
  
  return (
    <>
      <h2 id='wrap' className='category-header'>Delicious Wrap</h2>
      {renderCards(WrapData)}
    </>
  );
};

export default Wrap;
