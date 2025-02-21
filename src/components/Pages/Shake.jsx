import React from 'react';
import { ShakesData } from '../data/FoodData';
import PizzaPage from './Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Shake = () => {
  
  return (
    <>
      <h2 id='shake' className='category-header'>Delicious Shakes</h2>
      {renderCards(ShakesData)}
    </>
  );
};

export default Shake;
