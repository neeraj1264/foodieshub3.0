import React from 'react';
import { ChickenSnackData } from '../data/FoodData';
import PizzaPage from './Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const ChickenSnack = () => {
  
  return (
    <>
      <h2 id='Chicken_Snack' className='category-header'>Chicken_Snack</h2>
      {renderCards(ChickenSnackData)}
    </>
  );
};

export default ChickenSnack;
