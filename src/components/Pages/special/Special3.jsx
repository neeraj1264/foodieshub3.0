import React from 'react';
import PizzaPage from '../Pizza/PizzaPage';
import { special3data } from '../../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Special3 = () => {
  
  return (
    <>
      <h2 id='Powerplay_Feast' className='category-header'>Powerplay Feast</h2>
      {renderCards(special3data)}
    </>
  );
};

export default Special3;
