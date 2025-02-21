import React from 'react';
import { pastaData } from '../../data/FoodData';
import PizzaPage from '../Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Pasta = () => {
  
  return (
    <>
       <h2 id='pasta' className='category-header'>Delicious Pasta</h2>
       {renderCards(pastaData)}
    </>
  );
};

export default Pasta;
