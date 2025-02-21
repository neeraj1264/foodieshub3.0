import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { VegburgerData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Vegburger = () => {
  
  return (
    <>
      <h2 id='Veg_burger' className='category-header'>Veg_burger</h2>
      {renderCards(VegburgerData)}
    </>
  );
};

export default Vegburger;
