import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { ComboMixData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Combo = () => {
  
  return (
    <>
      <h2 id='Combo_Mix' className='category-header'> Combo Mix</h2>
      {renderCards(ComboMixData)}
    </>
  );
};

export default Combo;
