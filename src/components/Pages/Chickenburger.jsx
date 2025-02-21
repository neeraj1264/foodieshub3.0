import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { ChickenburgerData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Chickenburger = () => {
  
  return (
    <>
      <h2 id='Chicken_burger' className='category-header'>Chicken_burger</h2>
      {renderCards(ChickenburgerData)}
    </>
  );
};

export default Chickenburger;
