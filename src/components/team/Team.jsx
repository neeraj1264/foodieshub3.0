import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Team.css"
import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import HomeFooter from "../footer/HomeFooter";
import { useInView } from "react-intersection-observer";

const Team = () => {

  const location = useLocation();

  const teamMembers = [
    // { img: "./img/chef4.jpg", name: "Manjot singh", designation: "Manager"},
    { img: "./img/chef3.jpg", name: "Shweta", designation: "Receptionist" },
    { img: "./img/chef1.jpeg", name: "Raj Kumar", designation: "Chinese Chef" },
    { img: "./img/chef2.jpg", name: "Nandu", designation: "Indian Chef"},
  ];

  return (
<>

    {location.pathname === "/team" && <Header />}
    <div className="container-xxl pt-5 pb-3">
      <div className="container" id="team">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5 className="section-title ff-secondary text-primary fw-normal">
            Team Members
          </h5>
          <h1 className="mb-5">Our Master Chefs</h1>
        </div>
        <div className="row g-4">
        {teamMembers.map((member, index) => {
              const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

              return (
                <div
                  ref={ref}
                  key={index}
                  className={`col-lg-3 col-md-6 team-item-container ${
                    inView ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  data-wow-delay={`${2 * index}s`}
                >
              <div className="team-item text-center rounded overflow-hidden">
                <div className="rounded-circle overflow-hidden m-4">
                  <img className="img-fluid" src={member.img} alt={member.name} />
                </div>
                <h5 className="mb-0">{member.name}</h5>
                <small>{member.designation}</small>
                <div className="d-flex justify-content-center mt-3">

                {member.facebook && (
                  <a className="btn btn-square btn-primary mx-1" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                )}
                  {member.twitter && (
                  <a className="btn btn-square btn-primary mx-1" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  )}
                  {member.insta && (
                  <a className="btn btn-square btn-primary mx-1" href={member.insta}>
                    <i className="fab fa-instagram"></i>
                  </a>
                   )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
    {location.pathname === "/team" && <HomeFooter />}
    </>
  );
};

export default Team;
