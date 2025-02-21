import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./About.css";
import Header from "../header/Header";
import HomeFooter from "../footer/HomeFooter";
import OfferImg from "/img/offer.png";
import aboutUsImage from "/img/about.png";
import 'react-lazy-load-image-component/src/effects/blur.css';

const About = () => {
  const location = useLocation();

  return (
<>
      {location.pathname === "/about" && <Header />}
      <div className="about-us-container" id="about">
      <h3 className="about-heading">About Us</h3>
      <img src={aboutUsImage} alt="About Us" className="about-us-image"/>
      <div className="about-us-content">
        <p>
        Discover a world of flavors under one roof, from hearty breakfasts to delectable dinners,
            and everything in between. Foodies Hub is your one-stop destination for a diverse culinary experience.
         </p>
         <p>
            Craving pizza, burgers, or a heavenly slice of cake? Look no further!
            Foodies Hub is the ultimate destination to satisfy all your culinary cravings in a single order.
          </p>
          <p>
            Immerse yourself in a world where quality meets variety. Foodies Hub takes pride in offering a curated
            selection of dishes, ensuring every bite is a delightful experience.
          </p>
      </div>
      <img src={OfferImg} alt="About Us" className="offer-image" onClick={() => OfferDetail()}/>

    </div>
    {location.pathname === "/about" && <HomeFooter />}
    </>
  );
};

export default About;