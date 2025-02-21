import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './Banner.css'
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import ContactForm from '../ContactUs/Contact';
import { FaWhatsapp } from "react-icons/fa";
import HomeFooter from '../footer/HomeFooter';
import GoogleMap from '../map/GoogleMap';
import Hero from '../hero/Hero';
import About from '../about/About';
import Services from '../service/Services';
import Team from '../team/Team';

const items = [
  { id: 1,  imageUrl: '/img/burger.jpg',      title: 'Delicious Burger',   target: 'Burger'   , description: 'Hot Pattie, fresh veggies, and savory sauces in a perfect bun.' },
  { id: 2,  imageUrl: '/img/pizza.jpg',       title: 'Hot Pizzas',         target: 'Pizza'    , description: 'Crispy crusts and gooey cheese meet a medley of mouth-watering toppings in every slice.' },
  // { id: 3,  imageUrl: '/img/cheesepan.jpg',   title: 'Spicy Chinese',      target: 'Chinese'  , description: 'Zesty and aromatic Chinese dishes infused with bold spices.' },
  { id: 4,  imageUrl: '/img/cornsand.jpg',    title: 'Sweet Sandwiches',   target: 'Sandwich' , description: 'A delightful fusion of sweet and savory in every bite.' },
  { id: 5,  imageUrl: '/img/makhnipasta.jpg', title: 'Tasty Pasta',        target: 'Pasta'    , description: 'Irresistible pasta dishes coated in flavorful sauces for a satisfying experience.' },
  { id: 6,  imageUrl: '/img/dalmakhani.jpeg', title: 'Main Course',        target: 'Dinner'   , description: 'Hearty and comforting dishes that form the heart of a fulfilling meal.' },
  { id: 7,  imageUrl: '/img/butternaan.jpeg', title: 'Hot Naans',          target: 'Naan'     , description: 'Freshly baked naans offering warmth and a perfect complement to your favorite curry.' },
  { id: 9,  imageUrl: '/img/chaap1.jpg',      title: 'Chatpati Chaap',     target: 'Chaap'    , description: 'The perfect blend of spice and crunch in every bite of our chatpati chaap.' },
  { id: 10, imageUrl: '/img/shakes.jpg',      title: 'Delicious Shakes',   target: 'Shake'    , description: 'Rich and indulgent shakes crafted with the finest ingredients for pure delight.' },
  { id: 11, imageUrl: '/img/gb.jpg',          title: 'Garkic-Bread',       target: 'Garlic'   , description: 'The essence of Indian street food captured in a flavorful pav bhaji medley.' },
  // { id: 12, imageUrl: '/img/momo.jpg',        title: 'Hot Momos',          target: 'Momos'    , description: 'Steaming hot momos filled with succulent meat or vegetables for a comforting treat.' },
  { id: 13, imageUrl: '/img/cakes/choco.jpg', title: 'Celebrations Cakes', target: 'Cakes'     , description: 'Decadent celebration cakes, crafted with love to sweeten every moment.' },
  { id: 14, imageUrl: '/img/bhalle.jpeg',     title: 'Chatpati Chaat',     target: 'Snacks'   , description: 'An explosion of flavors in our tangy and crisp street-style chaat.' },
];

const MyCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the index to move to the next slide
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => {
      // Clear the interval to prevent memory leaks
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleChatMsg = () => {
    const whatsappNumber = "+917404339777";
    const message = `Hello! I'm interested in placing an order. Could you please provide me with more information about your menu options and delivery timings? Thanks!`;

    const whatsappLink =
      "https://api.whatsapp.com/send?phone=" +
      encodeURIComponent(whatsappNumber) +
      "&text=" +
      encodeURIComponent(message);

    console.log("WhatsApp link:", whatsappLink);

    // Open WhatsApp chat in a new window
    window.open(whatsappLink, "_blank");
  };

  return (
    <>
        <Header/>
        <Hero/>
        <Services/>
        <About/>
        <Team/>
        {/* <div className="front-image">
  <img src="/img/outer2.jpg" alt="Delicious Food" />
  <Link to="/menu" className="menu-button">
    Visit Our Menu
  </Link>
</div> */}

    {/* <Carousel activeIndex={index} onSelect={handleSelect} controls={false}>
    {items.map((item) => (
        <Carousel.Item key={item.id}>
            <div className="carousel-inner">

      <Link
       to={`/menu`}>
          <img className="d-block" src={item.imageUrl} alt={item.title} />
          </Link>
          </div>
        </Carousel.Item>
      ))}
    </Carousel> */}
    <FaWhatsapp className='whatsapp-button' onClick={() => handleChatMsg()}/>

      <GoogleMap/>
<ContactForm/>
<HomeFooter/>
    </>
  );
};

export default MyCarousel;
