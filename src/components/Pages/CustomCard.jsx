import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useCart } from "../../ContextApi";
import "../Pages/Pizza/Pizza.css";
import { FaMinus, FaPlus } from "react-icons/fa";
const CustomCard = ({ id, name, description, price, image, mrp, size }) => {
  const { priceH, priceF } = price;
  const { size1, size2 } = size;

  const {
    decrementCart,
    incrementCart,
    AddToCart,
    showButtons,
    setShowButtons,
    setCartItems,
    updateCartItemQuantity,
  } = useCart();

  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(size1);
  const [selectedSizePrice, setSelectedSizePrice] = useState(priceH);
  const productShowButtons = showButtons[id] || false;

  //                                                     description functionality

  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const truncatedDescription =
    description.length > 100 ? description.substring(0, 100) : description;

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setSelectedSize("");
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

  const handleAddToCart = () => {
    if (selectedSize === "") {
      // Handle the case where no size is selected
      alert("Please select a size.");
      return;
    }

    const product = {
      id,
      name: `${name} [${selectedSize}]`,
      price: selectedSizePrice || price, 
      quantity,
      image,
      mrp,
    };
    AddToCart(product);
    setShowButtons((prevShowButtons) => ({ ...prevShowButtons, [id]: true }));
    incrementCart();
    setSelectedSize("");
    setShow(false);
  };

  const handleAddBtnToCart = () => {
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
  };

  const handleAddBtnClick = () => {
      handleShow();
  };

  const handleRemoveToCart = () => {
    decrementCart();
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    updateCartItemQuantity(id, 0);
    setShowButtons((prevShowButtons) => ({ ...prevShowButtons, [id]: false }));
    localStorage.removeItem(`${id}_quantity`);
  };

  const handleSizeChange = (event) => {
    const newSize = event.target.value;

    // Update the selected size and its corresponding price
    setSelectedSize(newSize);
    switch (newSize) {
      case size1:
        setSelectedSizePrice(priceH);
        break;
      case size2:
        setSelectedSizePrice(priceF);
        break;
      default:
        // Handle the case where an unknown size is selected
        console.error("Unknown size selected.");
        return;
    }
  };
  useEffect(() => {
    // Retrieve quantity from local storage on component mount
    const storedQuantity = localStorage.getItem(`${id}_quantity`);
    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity, 10));
      setShowButtons((prevShowButtons) => ({ ...prevShowButtons, [id]: true }));
    }
  }, [id]);

  const hasPriceOptions =
    typeof price === "object" && "priceH" in price && "priceF" in price;

  const getTotalPrice = () => {
    let total = selectedSizePrice ? selectedSizePrice * quantity : price * quantity;
    return total;
  };

  return (
    <>
      <hr />
      <div className="product-card">
        <div className="product-details">
          <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>
            {name} [{size1}]
          </h3>
          <p style={{ fontWeight: "700" }}>
            ₹{priceH || price}
            <span
              style={{
                textDecoration: "line-through",
                marginLeft: ".5rem",
                color: "grey",
              }}
            >
              {mrp}
            </span>
            {!hasPriceOptions && (
              <span
                style={{
                  marginLeft: ".5rem",
                  color: "var(--bg)",
                }}
              >
                {(((mrp - price) / mrp) * 100).toFixed(0)}% off
              </span>
            )}
            {hasPriceOptions && (
              <span
                style={{
                  marginLeft: ".5rem",
                  color: "var(--bg)",
                }}
              >
                {(((mrp - priceH || price) / mrp) * 100).toFixed(0)}% off
              </span>
            )}
          </p>
          <p style={{ fontSize: ".8rem" }} onClick={toggleDescription}>
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
                onClick={handleAddBtnClick}
              >
                ADD
              </button>
            )}
            {hasPriceOptions && (
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
                  <Modal.Title>{name}</Modal.Title>
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

                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Choose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{size1}</td>
                        <td>₹{priceH}</td>
                        <td>
                          <input
                            type="radio"
                            value={size1}
                            checked={selectedSize === size1}
                            onChange={handleSizeChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>{size2}</td>
                        <td>₹{priceF}</td>
                        <td>
                          <input
                            type="radio"
                            value={size2}
                            checked={selectedSize === size2}
                            onChange={handleSizeChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
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
            )}
            {!hasPriceOptions && (
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

                  <h5 style={{ fontSize: "1.7rem" }}>{name}</h5>
                  <p
                    style={{
                      fontWeight: "700",
                      marginBottom: ".5rem",
                      fontSize: "1.3rem",
                    }}
                  >
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
            )}
          </div>
          {hasPriceOptions && <div className="cust">customisable</div>}
        </div>
      </div>
    </>
  );
};

export default CustomCard;
