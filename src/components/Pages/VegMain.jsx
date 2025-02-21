import React from 'react';
import PizzaPage from './Pizza/PizzaPage';
import { MainCourseData } from '../data/FoodData';

const renderCards = (data) => {
  return data.map((item) => <PizzaPage key={item.id} {...item} />);
};
const MainCourse = () => {
  
  return (
    <>
      <h2 id='Main_Course' className='category-header'>Main_Course</h2>
      {renderCards(MainCourseData)}
    </>
  );
};

export default MainCourse;
