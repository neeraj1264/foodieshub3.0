import React, { useState , useEffect } from "react";
import "./Footer.css";
import { NavLink, useLocation } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
// import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { GiSlicedBread } from "react-icons/gi";
import { MdRestaurantMenu } from "react-icons/md";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../../ContextApi";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Footer() {
  const { cartItemsCount } = useCart();
  const [isBumping, setIsBumping] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const handleGroceryClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // Don't render the footer if the current path is /cart
  if (location.pathname === "/cart") {
    return null;
  }
  // useEffect(() => {
  //   if (cartItemsCount > 0) {
  //     setIsBumping(true);
  //     const timer = setTimeout(() => {
  //       setIsBumping(false);
  //     }, 300);
  //     return () => clearTimeout(timer);
  //   }
  // }, [cartItemsCount]);
  return (
    <>
    {cartItemsCount > 0 && (
      <footer>
        <div className="footer-content">

          
            <NavLink to="/cart" className="nav-link pad i" activeclassname="active">
            <div className="cart">
            {cartItemsCount} {" "} item added{" "}
              <FaRegArrowAltCircleRight className="icon" /><br/>
              <b className="worth">View cart or continue shopping.</b>
              </div>
            </NavLink>
        </div>
      </footer>
          )}

    </>
  );
}

export default Footer;
