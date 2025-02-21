import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { VegSplData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const VegSpecial = () => {
  
  return (
    <>
      <h2 id='Veg_Special' className='category-header'>Veg_Special</h2>
      {renderCards(VegSplData)}
    </>
  );
};

export default VegSpecial;
