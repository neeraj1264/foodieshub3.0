import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { MojitoData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Mojito = () => {
  
  return (
    <>
      <h2 id='Mojito' className='category-header'> Mojito</h2>
      {renderCards(MojitoData)}
    </>
  );
};

export default Mojito;
