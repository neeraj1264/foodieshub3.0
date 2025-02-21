import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { FriesData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Fries = () => {
  
  return (
    <>
      <h2 id='Fries' className='category-header'>Fries</h2>
      {renderCards(FriesData)}
    </>
  );
};

export default Fries;
