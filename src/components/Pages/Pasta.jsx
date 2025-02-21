import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { PastaData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Pasta = () => {
  
  return (
    <>
      <h2 id='Pasta' className='category-header'>Pasta</h2>
      {renderCards(PastaData)}
    </>
  );
};

export default Pasta;
