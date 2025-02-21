import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { MaggieData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Maggie = () => {
  
  return (
    <>
      <h2 id='Maggie' className='category-header'> Maggie</h2>
      {renderCards(MaggieData)}
    </>
  );
};

export default Maggie;
