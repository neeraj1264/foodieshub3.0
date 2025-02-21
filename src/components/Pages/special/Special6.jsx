import React from 'react';
import PizzaPage from '../Pizza/PizzaPage';
import { special6data } from '../../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Special6 = () => {
  
  return (
    <>
      <h2 id='Fifty_Over_Fiesta' className='category-header'>Fifty Over Fiesta</h2>
      {renderCards(special6data)}
    </>
  );
};

export default Special6;
