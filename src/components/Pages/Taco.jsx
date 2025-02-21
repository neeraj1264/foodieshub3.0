import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { TacoData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Taco = () => {
  
  return (
    <>
      <h2 id='Taco' className='category-header'>Taco</h2>
      {renderCards(TacoData)}
    </>
  );
};

export default Taco;
