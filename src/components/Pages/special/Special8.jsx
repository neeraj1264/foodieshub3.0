import React from 'react';
import PizzaPage from '../Pizza/PizzaPage';
import { special8data } from '../../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Special8 = () => {
  
  return (
    <>
      <h2 id='Match_Winner_Meal' className='category-header'>Match Winner Meal</h2>
      {renderCards(special8data)}
    </>
  );
};

export default Special8;
