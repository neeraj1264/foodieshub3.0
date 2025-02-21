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
            <h5>Australian Bite</h5>
            <p>Ambarsari Farm, Kurukshetra Road Pehowa, (136128)</p>
          </span>
        </div>
        <div className="contact">
          <i className="fa fa-phone"></i>
          <span>
            <h5>+91 74043-39777</h5>
            <h5>+91 74043-38777</h5>
            <p>Monday to Sunday, 10AM to 10PM</p>
          </span>
        </div>
        <div className="contact">
          <i className="fa fa-envelope"></i>
          <span>
            <h5>australianbite41@gmail.com</h5>
            <p>Email us your query</p>
          </span>
        </div>
      </div>

      <div
        ref={mapRef}
        className={`map ${mapInView ? "animate-fade-in-up" : "opacity-0"}`}
      >
        {" "}
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.0759059975635!2d76.60115010898824!3d29.977248474853024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e25003ad52a0f%3A0xf1f7bbf461140443!2sAustralian%20Bite!5e0!3m2!1sen!2sin!4v1738396033499!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {location.pathname === "/address" && <HomeFooter />}
    </>
  );
};

export default GoogleMap;
