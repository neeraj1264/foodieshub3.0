import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./About.css";
import Header from "../header/Header";
import HomeFooter from "../footer/HomeFooter";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const About = () => {
  const location = useLocation();

  return (
<>
      {location.pathname === "/about" && <Header />}
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
        <h5 className="about-title" id="about">
              About Us
            </h5>
          {/* Image Grid */}
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-start">
                <LazyLoadImage
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.1s"
                  src="/outer.jpg"
                  alt="About 1"
                  effect="blur"
                  visibleByDefault={false} 
                  delayTime={2300}
                />
              </div>
              <div className="col-6 text-start">
                <LazyLoadImage
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.3s"
                  src="/img/a2.jpg"
                  alt="About 2"
                  style={{ marginTop: "25%" }}
                  effect="blur"
                  visibleByDefault={false} 
                  delayTime={300}
                />
              </div>
              <div className="col-6 text-end">
                <LazyLoadImage
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.5s"
                  src="/img/a3.jpg"
                  alt="About 3"
                  effect="blur"
                  visibleByDefault={false} 
                  delayTime={300}
                />
              </div>
              <div className="col-6 text-end">
                <LazyLoadImage
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.7s"
                  src="/img/a4.jpg"
                  alt="About 4"
                  effect="blur"
                  visibleByDefault={false} 
                  delayTime={300}
                />
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="col-lg-6">

            <h1 className="mb-4 welcome">
              Welcome to <i className="fa fa-utensils me-2"></i>Australian Bite
            </h1>
            <p className="mb-4">
            Welcome to our online food ordering platform! We bring you the best
            flavors, fresh ingredients, and fast delivery. Whether you're
            craving a quick bite or a full meal, we ensure a seamless
            experience, from browsing to checkout. <br />
            <br />
            Our mission is to deliver delicious meals right to your doorstep,
            maintaining top-notch hygiene and taste. Join thousands of happy
            customers who trust us for their daily meals! <br />
            </p>

          </div>
        </div>
      </div>
    </div>
    {location.pathname === "/about" && <HomeFooter />}
    </>
  );
};

export default About;
