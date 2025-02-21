import React from "react";
import "./HomeFooter.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";

const HomeFooter = () => {
  const handleChatMsg = () => {
    const whatsappNumber = "+917015823645";
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
    <div className="home-footer">
      <div className="home-footer-container">
        <div className="home-footer-section">
          <h3>Contact Us</h3>
          <div style={{ display: "flex" }}>
            <span>
              <i className="fa fa-home"></i>
            </span>
            <h5></h5>
            <p> Foodies Hub Pehowa , Haryana , India (136128)</p>          </div>
          <div style={{ display: "flex" }}>
          <span>
              <i className="fa fa-phone"></i>
            </span>
            <div>
          <p>
            +91 70158-23645
          </p>
          </div>
          </div>
          <p>
            <span>
              <i className="fa fa-envelope"></i>
            </span>
            foodieshub11@gmail.com
          </p>
        </div>

        <div className="home-footer-section">
          <h3>Follow Us</h3>
          <p>
            <a
              href="https://www.facebook.com/share/1KfKFe7WJN/"
              target="_blank"
              className="social-icon insta"
            >
              <i className="fab fa-facebook"></i>
              <span>Facebook</span>
            </a>
          </p>
          <p>
            <Link
              onClick={() => handleChatMsg()}
              target="_blank"
              className="social-icon linkedin"
            >
              <i className="fab fa-whatsapp"></i>
              <span>Whatsapp</span>
            </Link>
          </p>
        </div>

        <div className="home-footer-section">
          <h3>Opening</h3>
          <p>Monday - Saturday</p>
          <p> 10AM - 10PM</p>
          <p>Sunday</p>
          <p>10AM - 10PM</p>
        </div>

        <div className="home-footer-section">
          <h3>Links</h3>
          <Link to="/about">
            {" "}
            <p className="footer-link">About</p>
          </Link>
          <Link to="/address">
            {" "}
            <p className="footer-link">Contact Us</p>
          </Link>
          <Link to="/feedback">
            <p className="footer-link">Feedback</p>
          </Link>
        </div>
      </div>
      <div className="home-footer-links">
        <p>Copyright © foodieshub.online</p>
        <p> All Rights Reserved.</p>
        <span>Design by Neeraj 70158-23645</span>
      </div>
    </div>
  );
};

export default HomeFooter;