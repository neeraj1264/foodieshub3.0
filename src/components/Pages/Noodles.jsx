import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { NoodlesData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Noodles = () => {
  
  return (
    <>
      <h2 id='Noodles' className='category-header'> Noodles</h2>
      {renderCards(NoodlesData)}
    </>
  );
};

export default Noodles;
