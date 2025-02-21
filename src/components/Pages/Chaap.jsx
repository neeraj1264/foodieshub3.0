import React from 'react';
import { ChaapData } from '../data/FoodData';
import PizzaPage from './Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Chaap = () => {
  
  return (
    <>
      <h2 id='chaap' className='category-header'>Delicious Chaap</h2>
      {renderCards(ChaapData)}
    </>
  );
};

export default Chaap;
