import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Services.css";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const services = [
    { icon: "fa-users", title: "About Us", id: "#about", description: "Learn more about our journey and passion for great food." },
  { icon: "fa-phone", title: "Contact Us", id: "#contact", description: "Get in touch with us for inquiries or support." },
  { icon: "fa-user-tie", title: "Master Chefs", id: "#team", description: "Meet our expert chefs who create delicious dishes." },
  { icon: "fa-comment-dots", title: "Feedback", id: "#feedback", description: "Share your experience and help us improve." }
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-4">
          {services.map((service, index) => {
            const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

            return (
              <div
                ref={ref}
                key={index}
                className={`col-lg-3 col-sm-6 service-item-container ${
                  inView ? "animate-fade-in-up" : "opacity-0"
                }`}
                data-wow-delay={`${0.2 * index}s`}
              >
                <a href={service.id}>
                  <div className="service-item rounded pt-3">
                    <div className="p-4 text-center">
                      <i className={`fa fa-3x ${service.icon} mb-4`}></i>
                      <h5>{service.title}</h5>
                      <p> {service.description}</p>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
