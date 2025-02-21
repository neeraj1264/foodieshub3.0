import React from 'react';
import { JuiceData } from '../data/FoodData';
import PizzaPage from './Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Juice = () => {
  
  return (
    <>
      <h2 id='juice' className='category-header'>Fresh Juices</h2>
      {renderCards(JuiceData)}
    </>
  );
};

export default Juice;
