import React from 'react';
import PizzaPage from '../Pizza/PizzaPage';
import { special2data } from '../../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Special2 = () => {
  
  return (
    <>
      <h2 id='Boundary_Buster_Combo' className='category-header'>Boundary Buster Combo</h2>
      {renderCards(special2data)}
    </>
  );
};

export default Special2;
