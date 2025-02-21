import React, { useEffect, useState } from "react";
import { useCart } from "../../../ContextApi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Button, Modal, Table } from "react-bootstrap";
import "../../Pages/Pizza/Pizza.css";
const Cards = ({ id, name, description, price, image, mrp }) => {
  const {
    decrementCart,
    incrementCart,
    AddToCart,
    showButtons,
    setShowButtons,
    cartItems,
    setCartItems,
    updateCartItemQuantity,
  } = useCart();

  const productInCart = cartItems.find((item) => item.id === id);
  const productShowButtons = showButtons[id] || false;
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      setShowButtons(false);
      decrementCart();
    }
  };
  const getTotalPrice = () => {
    let total = price * quantity;
    return total;
  };
  //                                                     description functionality

  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const truncatedDescription =
    description.length > 100 ? description.substring(0, 100) : description;

  useEffect(() => {
    // Retrieve quantity from local storage on component mount
    const storedQuantity = localStorage.getItem(`${id}_quantity`);
    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity, 10));
      setShowButtons((prevShowButtons) => ({ ...prevShowButtons, [id]: true }));
    }
  }, [id]);

  const handleAddToCart = () => {
    const product = {
      id,
      name,
      price,
      quantity,
      image,
      mrp,
    };
    AddToCart(product);
    setShowButtons((prevShowButtons) => ({ ...prevShowButtons, [id]: true }));
    incrementCart();
    setQuantity(quantity);
    setShow(false);
  };

  const handleRemoveToCart = () => {
    decrementCart();
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    updateCartItemQuantity(id, 0);
    setShowButtons((prevShowButtons) => ({ ...prevShowButtons, [id]: false }));
    localStorage.removeItem(`${id}_quantity`);
  };
  return (
    <>
      <hr className="hr" />
      <div className="product-card">
        <div className="product-details">
          <h5>{name}</h5>
          <p style={{ fontWeight: "700", marginBottom: ".5rem" }}>
            ₹{price}
            <span
              style={{
                textDecoration: "line-through",
                marginLeft: ".5rem",
                color: "grey",
              }}
            >
              {mrp}
            </span>
            <span
              style={{
                marginLeft: ".5rem",
                color: "var(--bg)",
              }}
            >
              {(((mrp - price) / mrp) * 100).toFixed(0)}% off
            </span>
          </p>
          <p className="description" onClick={toggleDescription}>
            {showFullDescription ? (
              description
            ) : (
              <>
                {description.length > 50
                  ? description.substring(0, 50) + "..."
                  : description}
                {description.length > 50 && (
                  <span style={{ color: "black", fontWeight: 500 }}>
                    {" "}
                    read more
                  </span>
                )}
              </>
            )}
          </p>
        </div>
        <div className="add-to-cart">
          <div>
            <img src={image} alt="Product" onClick={() => handleShow()} />
          </div>
          <div className="add-btn">
            {productShowButtons && (
              <button
                variant="contained"
                style={{
                  color: "whitesmoke",
                  border: "none",
                  background: "#d32e2e",
                  borderRadius: ".5rem",
                  boxShadow: "white 1px 0px 3px 3px",
                }}
                onClick={handleRemoveToCart}
              >
                Added
              </button>
            )}
            {!productShowButtons && (
              <button
                variant="contained"
                className="btn"
                onClick={() => handleShow()}
              >
                ADD
              </button>
            )}

            <Modal
              className="modeldialog"
              show={show}
              onHide={handleClose}
              style={{
                position: "fixed",
                bottom: "2px",
                background: "white",
              }}
            >
              <Modal.Header closeButton className="modalheader">
                <Modal.Title>
                  <div
                    style={{
                      textAlign: "center",
                      fontWeight: "700",
                    }}
                  >
                    Foodies Hub
                  </div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  height: "75vh",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "transparent transparent",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem", // Add some margin at the bottom for spacing
                  }}
                >
                  <img
                    src={image}
                    alt={name}
                    style={{
                      maxWidth: "18rem",
                      borderRadius: "1rem",
                    }}
                  />
                </div>

                <h5 style={{fontSize: "1.7rem"}}>{name}</h5>
                <p style={{ fontWeight: "700", marginBottom: ".5rem" , fontSize: "1.3rem"}}>
                  ₹{price}
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginLeft: ".5rem",
                      color: "grey",
                    }}
                  >
                    {mrp}
                  </span>
                  <span
                    style={{
                      marginLeft: ".5rem",
                      color: "var(--bg)",
                    }}
                  >
                    {(((mrp - price) / mrp) * 100).toFixed(0)}% off
                  </span>
                </p>

                <p>{description}</p>
              </Modal.Body>
              <Modal.Footer className="modalfooter">
                <div className="quantity-update">
                  <Button
                    variant="contained"
                    style={{ color: "var(--bg)" }}
                    onClick={handleDecrement}
                  >
                    <FaMinus />
                  </Button>
                  <span style={{ margin: "0 0.5rem", color: "black" }}>
                    {quantity}
                  </span>
                  <Button
                    variant="contained"
                    style={{ color: "var(--bg)" }}
                    onClick={handleIncrement}
                  >
                    <FaPlus />
                  </Button>
                </div>
                <Button className="addtocart" onClick={handleAddToCart}>
                  Add to Cart
                  <span style={{ paddingLeft: ".3rem", fontWeight: "800" }}>
                    ₹{getTotalPrice()}
                  </span>
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
