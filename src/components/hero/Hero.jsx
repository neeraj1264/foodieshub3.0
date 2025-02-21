import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import { useSwipeable } from "react-swipeable"; // Import swipe hook

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = () => {
      navigate("/menu");
  };

      // Swipe handlers
    const handlers = useSwipeable({
      onSwipedLeft: () => navigate("/menu"), // Redirect on left swipe
      preventDefaultTouchmoveEvent: true,
      trackTouch: true,
      trackMouse: true,
    });
  
  return (
    <div {...handlers} className="container-xxl py-5 bg-dark hero-header mb-5">
      <div className="container my-5 py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="display-3 text-white animated slideInLeft">
              Enjoy Our<br />Delicious Meal
            </h1>
            <p className="text-white animated slideInLeft mb-4 pb-2">
              Indulge in a world of flavors with our handcrafted meals. Fresh ingredients, bold flavors, and unforgettable dining experiences await you!
            </p>

            {/* Button with Loading Effect */}
            <button 
              className="bttn py-sm-3 px-sm-5 me-3 animated slideInLeft"
              onClick={handleRedirect}
              disabled={loading} // Disable button when loading
            >
              {loading ? "Menu Loading..." : "View Our Menu"}
            </button>
          </div>
          
          {/* Image Click Redirect */}
          <div className="col-lg-6 text-center text-lg-end overflow-hidden">
            <img
              className="img-fluid"
              src=".\img\pizza1.png"
              alt="Hero Section"
              onClick={handleRedirect}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
