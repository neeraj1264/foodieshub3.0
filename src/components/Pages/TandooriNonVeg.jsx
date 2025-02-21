import React from 'react';
import { TandooriNonVegData } from '../data/FoodData';
import PizzaPage from './Pizza/PizzaPage';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const TandooriNonVeg = () => {
  
  return (
    <>
      <h2 id='Tandoori_Non_Veg' className='category-header'>Tandoori_Non_Veg</h2>
      {renderCards(TandooriNonVegData)}
    </>
  );
};

export default TandooriNonVeg;
