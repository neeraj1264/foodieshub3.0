import React from 'react';
import PizzaPage from '../Pizza/PizzaPage';
import { special4data } from '../../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const Special4 = () => {
  
  return (
    <>
      <h2 id='Wicket_Whopper_Combo' className='category-header'>Wicket Whopper Combo</h2>
      {renderCards(special4data)}
    </>
  );
};

export default Special4;
