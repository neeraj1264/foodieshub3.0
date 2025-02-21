import React from 'react';
import PizzaPage from '../Pizza/PizzaPage';
import { special7data } from '../../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Special7 = () => {
  
  return (
    <>
      <h2 id='TossUp_Treat_Combo' className='category-header'>Toss-Up Treat Combo</h2>
      {renderCards(special7data)}
    </>
  );
};

export default Special7;
