import React from 'react';
import PizzaPage from '../Pizza/PizzaPage';
import { special4data } from '../../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Special5 = () => {
  
  return (
    <>
      <h2 id='Champions_Clash_Combo' className='category-header'>Champions Clash Combo</h2>
      {renderCards(special4data)}
    </>
  );
};

export default Special5;
