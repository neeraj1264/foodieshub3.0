import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { MainData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Main = () => {
  
  return (
    <>
      <h2 id='Main' className='category-header'> Main</h2>
      {renderCards(MainData)}
    </>
  );
};

export default Main;
