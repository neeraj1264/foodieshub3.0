import React from 'react';
import { special1data } from '../../data/FoodData';
import PizzaPage from '../Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Special1 = () => {
  
  return (
    <>
      <h2 id='Sixer_Special_Combo' className='category-header'>Sixer Special Combo</h2>
      {renderCards(special1data)}
    </>
  );
};

export default Special1;
