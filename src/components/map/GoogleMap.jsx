import { useLocation } from "react-router-dom";
import "./GoogleMap.css";
import Header from "../header/Header";
import HomeFooter from "../footer/HomeFooter";
import { useInView } from "react-intersection-observer";

const GoogleMap = () => {
  const location = useLocation();

  // Apply useInView for contact details
  const { ref: contactRef, inView: contactInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Apply useInView for the map
  const { ref: mapRef, inView: mapInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      {location.pathname === "/address" && <Header />}

      <div className="contact-heading" id="contact">
        Contact <span className="highlight">Us</span>
      </div>

      <div
        ref={contactRef}
        className={`contact-main ${
          contactInView ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {" "}
        <div className="contact">
          <i className="fa fa-home"></i>
          <span>
            <h5>Foodies Hub</h5>
            <p>Pehowa , Haryana , India (136128)</p>
          </span>
        </div>
        <div className="contact">
          <i className="fa fa-phone"></i>
          <span>
            <h5>+91 70158-23645</h5>
            <p>Monday to Sunday, 10AM to 10PM</p>
          </span>
        </div>
        <div className="contact">
          <i className="fa fa-envelope"></i>
          <span>
            <h5>foodieshub11@gmail.com</h5>
            <p>Email us your query</p>
          </span>
        </div>
      </div>

      {location.pathname === "/address" && <HomeFooter />}
    </>
  );
};

export default GoogleMap;