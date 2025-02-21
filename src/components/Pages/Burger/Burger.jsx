import React from 'react';
import { BurgerData } from '../../data/FoodData';
import PizzaPage from '../Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Burger = () => {
  
  return (
    <>
      <h2 id='burger' className='category-header'>Delicious Burger</h2>
      {renderCards(BurgerData)}
    </>
  );
};

export default Burger;
