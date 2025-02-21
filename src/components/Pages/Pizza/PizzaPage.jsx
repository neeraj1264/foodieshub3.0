import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../../../ContextApi";
import "./Pizza.css";

const PizzaPage = ({ id, name, description, price, image, mrp, size }) => {
  // Use cart context (same as before)
  const {
    decrementCart,
    incrementCart,
    AddToCart,
    showButtons,
    setShowButtons,
    setCartItems,
    updateCartItemQuantity,
  } = useCart();

  // Determine the product type based on the passed price object:
  // - If price contains priceR, priceM and priceL → treat as "pizza" type.
  // - If price contains priceH and priceF → treat as "custom" type.
  // - Otherwise, treat it as a default product.
  const isPizza =
    price &&
    typeof price === "object" &&
    "priceR" in price &&
    "priceM" in price &&
    "priceL" in price;
  const isCustom =
    price &&
    typeof price === "object" &&
    "priceH" in price &&
    "priceF" in price;

  const productType = isPizza ? "pizza" : isCustom ? "custom" : "default";

  // For products with size options, pick the default size and price.
  const defaultSize =
    productType === "pizza"
      ? size?.size1 || ""
      : productType === "custom"
      ? size?.size1 || ""
      : "";
  const defaultPrice =
    productType === "pizza"
      ? price.priceR
      : productType === "custom"
      ? price.priceH
      : price;

  // Component states
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [selectedSizePrice, setSelectedSizePrice] = useState(defaultPrice);
  const productShowButtons = showButtons[id] || false;

  // For toggling the "read more" description
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  // --- Only used for Pizza type ---
  // For pizzas we want to offer addon (cheese) options.
  const [selectedCLSize, setSelectedCLSize] = useState("R"); // to choose the cheese price (R, M, or L)
  const [addons, setAddons] = useState({
    extraCheese: false,
    cheeseburst: false,
    PanBase: false,
    ThinCrust: false,
    onion: false,
    capsicum: false,
    paneer: false,
    mushroom: false,
    jalapeno: false,
    peper: false,
    corn: false,
    olives: false,
    tomato: false,
  });

  // Define the cheeselist (only for pizza)
  const cheeselist = [
    {
      name: "Extra Cheese",
      key: "extraCheese",
      prices: { R: 35, M: 50, L: 90 },
    },
    {
      name: "CheeseBrust",
      key: "cheeseburst",
      prices: { R: 60, M: 90, L: 110 },
    },
    { name: "PanBase", key: "PanBase", prices: { R: 10, M: 20, L: 30 } },
    { name: "ThinCrust", key: "ThinCrust", prices: { R: 20, M: 30, L: 50 } },
  ]
  const toppingList = [
    {
      name: "onion",
      key: "onion",
      prices: { R: 25, M: 35, L: 55 },
    }, {
      name: "capsicum",
      key: "capsicum",
      prices: { R: 25, M: 35, L: 55 },
    }, {
      name: "paneer",
      key: "paneer",
      prices: { R: 25, M: 35, L: 55 },
    }, {
      name: "mushroom",
      key: "mushroom",
      prices: { R: 25, M: 35, L: 55 },
    }, {
      name: "jalapeno",
      key: "jalapeno",
      prices: { R: 25, M: 35, L: 55 },
    }, {
      name: "Red peper",
      key: "Red peper",
      prices: { R: 25, M: 35, L: 55 },
    },{
      name: "corn",
      key: "corn",
      prices: { R: 25, M: 35, L: 55 },
    },{
      name: "black olives",
      key: "black olives",
      prices: { R: 25, M: 35, L: 55 },
    },{
      name: "tomato",
      key: "tomato",
      prices: { R: 25, M: 35, L: 55 },
    },
  ];

  // Handle addon checkbox changes (for pizza type)
  const handleAddonChange = (addonKey) => {
    setAddons((prevAddons) => ({
      ...prevAddons,
      [addonKey]: !prevAddons[addonKey],
    }));
  };
  // --- End pizza-specific state ---

  // Retrieve stored quantity from localStorage on mount (if needed)
  useEffect(() => {
    const storedQuantity = localStorage.getItem(`${id}_quantity`);
    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity, 10));
      setShowButtons((prev) => ({ ...prev, [id]: true }));
    }
  }, [id, setShowButtons]);

  // Modal open/close handlers
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setSelectedSize(defaultSize);
    setSelectedSizePrice(defaultPrice);
    setShow(false);
  };

  // Quantity increment/decrement
  const handleIncrement = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Handle size selection changes.
  // For pizza, we expect three sizes; for custom, two sizes.
  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
    if (productType === "pizza") {
      if (newSize === size.size1) {
        setSelectedSizePrice(price.priceR);
        setSelectedCLSize("R");
      } else if (newSize === size.size2) {
        setSelectedSizePrice(price.priceM);
        setSelectedCLSize("M");
      } else if (newSize === size.size3) {
        setSelectedSizePrice(price.priceL);
        setSelectedCLSize("L");
      } else {
        setSelectedSizePrice(price.priceR);
        setSelectedCLSize("R");
      }
    } else if (productType === "custom") {
      if (newSize === size.size1) {
        setSelectedSizePrice(price.priceH);
      } else if (newSize === size.size2) {
        setSelectedSizePrice(price.priceF);
      } else {
        setSelectedSizePrice(price.priceH);
      }
    }
  };

  // Calculate total price based on quantity, selected size, and (if pizza) addons
  const getTotalPrice = () => {
    let total = selectedSizePrice * quantity;
    if (productType === "pizza") {
      cheeselist.forEach((addon) => {
        if (addons[addon.key]) {
          total += addon.prices[selectedCLSize] * quantity;
        }
      });
      toppingList.forEach((topping) => {
        if (addons[topping.key]) {
          total += topping.prices[selectedCLSize] * quantity;
        }
      });
    }
    return total;
  };

  // Add-to-cart handler that varies by product type
  const handleAddToCart = () => {
    // Only require a size selection for products that offer size options
    if (
      (productType === "pizza" || productType === "custom") &&
      selectedSize === ""
    ) {
      alert("Please select a size.");
      return;
    }

    if (productType === "pizza") {
      // For pizza: gather selected cheese addons
      const selectedCheeses = [];
      cheeselist.forEach((addon) => {
        if (addons[addon.key]) {
          selectedCheeses.push({
            name: addon.name,
            price: addon.prices[selectedCLSize],
          });
        }
      });

        // Gather selected topping addons
        const selectedToppings = [];
        toppingList.forEach((topping) => {
          if (addons[topping.key]) {
            selectedToppings.push({
              name: topping.name,
              price: topping.prices[selectedCLSize],
            });
          }
        });
        
      const product = {
        id,
        name: selectedSize ? `${name} [${selectedSize}]` : name,
        price: selectedSizePrice,
        quantity,
        image,
        mrp,
        ...(selectedCheeses.length > 0 && { cheeses: selectedCheeses }),
        ...(selectedToppings.length > 0 && { toppings: selectedToppings }),
      };
      let total = selectedSizePrice * quantity;
      selectedCheeses.forEach((addon) => {
        total += addon.price * quantity;
      });
      selectedToppings.forEach((topping) => {
        total += topping.price * quantity;
      });
      product.totalPrice = total;
      AddToCart(product);
      incrementCart();
      setSelectedSize(defaultSize);
      setSelectedSizePrice(price.priceR);
      setShow(false);
      setShowButtons((prev) => ({ ...prev, [id]: true }));
    } else if (productType === "custom") {
      // For custom products
      const product = {
        id,
        name: selectedSize ? `${name} [${selectedSize}]` : name,
        price: selectedSizePrice,
        quantity,
        image,
        mrp,
      };
      AddToCart(product);
      incrementCart();
      setSelectedSize(defaultSize);
      setShow(false);
      setShowButtons((prev) => ({ ...prev, [id]: true }));
    } else {
      // Default (no size options)
      const product = { id, name, price, quantity, image, mrp };
      AddToCart(product);
      incrementCart();
      setShow(false);
      setShowButtons((prev) => ({ ...prev, [id]: true }));
    }
  };

  // Remove-from-cart handler (common for both types)
  const handleRemoveToCart = () => {
    decrementCart();
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    updateCartItemQuantity(id, 0);
    setShowButtons((prev) => ({ ...prev, [id]: false }));
    localStorage.removeItem(`${id}_quantity`);
  };

  // Render the modal content conditionally based on the product type.
  const renderModalContent = () => {
    if (productType === "pizza") {
      return (
        <>
          <Modal.Header closeButton className="modalheader">
            <img src={image} alt={name} />
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <h3>Select Size</h3>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>{size.size1}</td>
                  <td>₹{price.priceR}</td>
                  <td>
                    <input
                      type="radio"
                      value={size.size1}
                      checked={selectedSize === size.size1}
                      onChange={handleSizeChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>{size.size2}</td>
                  <td>₹{price.priceM}</td>
                  <td>
                    <input
                      type="radio"
                      value={size.size2}
                      checked={selectedSize === size.size2}
                      onChange={handleSizeChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>{size.size3}</td>
                  <td>₹{price.priceL}</td>
                  <td>
                    <input
                      type="radio"
                      value={size.size3}
                      checked={selectedSize === size.size3}
                      onChange={handleSizeChange}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
            <h3>Addons</h3>
            <Table striped bordered hover>
              <tbody>
                {cheeselist.map((addon) => (
                  <tr key={addon.key}>
                    <td>{addon.name}</td>
                    <td>₹{addon.prices[selectedCLSize]}</td>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={addons[addon.key]}
                        onChange={() => handleAddonChange(addon.key)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h3>Extra Toppings</h3>
            <Table striped bordered hover>
              <tbody>
                {toppingList.map((topping) => (
                  <tr key={topping.key}>
                    <td>{topping.name}</td>
                    <td>₹{topping.prices[selectedCLSize]}</td>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={addons[topping.key]}
                        onChange={() => handleAddonChange(topping.key)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer className="modalfooter">
            <div className="quantity-update">
              <Button
                variant="contained"
                style={{ color: "var(--yellow)" }}
                onClick={handleDecrement}
              >
                <FaMinus />
              </Button>
              <span style={{ margin: "0 0.5rem", color: "white" }}>
                {quantity}
              </span>
              <Button
                variant="contained"
                style={{ color: "var(--yellow)" }}
                onClick={handleIncrement}
              >
                <FaPlus />
              </Button>
            </div>
            <Button className="addtocart" onClick={handleAddToCart}>
              Add to Cart{" "}
              <span style={{ paddingLeft: ".3rem", fontWeight: "800" }}>
                ₹{getTotalPrice()}
              </span>
            </Button>
          </Modal.Footer>
        </>
      );
    } else if (productType === "custom") {
      return (
        <>
          <Modal.Header closeButton className="modalheader">
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <img
                src={image}
                alt={name}
                style={{ maxWidth: "18rem", borderRadius: "1rem" }}
              />
            </div>
            <Table striped bordered hover style={{ marginBottom: "10rem" }}>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Choose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{size.size1}</td>
                  <td>₹{price.priceH}</td>
                  <td>
                    <input
                      type="radio"
                      value={size.size1}
                      checked={selectedSize === size.size1}
                      onChange={handleSizeChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>{size.size2}</td>
                  <td>₹{price.priceF}</td>
                  <td>
                    <input
                      type="radio"
                      value={size.size2}
                      checked={selectedSize === size.size2}
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
                style={{ color: "var(--yellow)" }}
                onClick={handleDecrement}
              >
                <FaMinus />
              </Button>
              <span style={{ margin: "0 0.5rem", color: "white" }}>
                {quantity}
              </span>
              <Button
                variant="contained"
                style={{ color: "var(--yellow)" }}
                onClick={handleIncrement}
              >
                <FaPlus />
              </Button>
            </div>
            <Button className="addtocart" onClick={handleAddToCart}>
              Add to Cart{" "}
              <span style={{ paddingLeft: ".3rem", fontWeight: "800" }}>
                ₹{getTotalPrice()}
              </span>
            </Button>
          </Modal.Footer>
        </>
      );
    } else {
      // For default products (without any size options)
      return (
        <>
          <Modal.Header closeButton className="modalheader">
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <img
                src={image}
                alt={name}
                style={{ maxWidth: "18rem", borderRadius: "1rem" }}
              />
            </div>
            <h5 style={{ fontSize: "1.2rem" }}>{name}</h5>
            <p style={{ fontWeight: "700" }}>
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
              <span style={{ marginLeft: ".5rem", color: "var(--yellow)" }}>
                {(((mrp - price) / mrp) * 100).toFixed(0)}% off
              </span>
            </p>
            <p>{description}</p>
          </Modal.Body>
          <Modal.Footer className="modalfooter">
            <div className="quantity-update">
              <Button
                variant="contained"
                style={{ color: "var(--yellow)" }}
                onClick={handleDecrement}
              >
                <FaMinus />
              </Button>
              <span style={{ margin: "0 0.5rem", color: "white" }}>
                {quantity}
              </span>
              <Button
                variant="contained"
                style={{ color: "var(--yellow)" }}
                onClick={handleIncrement}
              >
                <FaPlus />
              </Button>
            </div>
            <Button className="addtocart" onClick={handleAddToCart}>
              Add to Cart{" "}
              <span style={{ paddingLeft: ".3rem", fontWeight: "800" }}>
                ₹{getTotalPrice()}
              </span>
            </Button>
          </Modal.Footer>
        </>
      );
    }
  };

  return (
    <>
      <hr />
      <div className="product-card">
        <div className="product-details">
          <h3
            style={{
              fontSize: "1.2rem",
              fontFamily: "initial",
              fontWeight: "bold",
            }}
          >
            {name}{" "}
            {defaultSize && productType !== "default" ? `[${defaultSize}]` : ""}
          </h3>
          <p style={{ fontWeight: "700", fontFamily: "initial" }}>
            ₹{defaultPrice}
            <span
              style={{
                textDecoration: "line-through",
                marginLeft: ".5rem",
                color: "grey",
              }}
            >
              {mrp}
            </span>
            {/* {productType !== "default" && ( */}
              <span style={{ marginLeft: ".5rem", color: "var(--yellow)" }}>
                {(((mrp - defaultPrice) / mrp) * 100).toFixed(0)}% off
              </span>
            {/* )} */}
          </p>
          <p className="description" onClick={toggleDescription}>
            {showFullDescription 
              ? description
              : description.length > 50
              ? description.substring(0, 50) + "..."
              : description}
            {description.length > 50 && !showFullDescription && (
              <span style={{ color: "var(--yellow)", fontWeight: 500 }}>
                {" "}
                read more
              </span>
            )}
          </p>
        </div>
        <div className="add-to-cart">
          <div>
            <img src={image} alt="Product" onClick={handleShow} />
          </div>
          <div className="add-btn">
            {productShowButtons ? (
              <button
                style={{
                  color: "whitesmoke",
                  background: "var(--in)",
                  boxShadow: "var(--out) 1px 0px 3px 3px",
                }}
                onClick={handleRemoveToCart}
              >
                Added
              </button>
            ) : (
              <button className="btn" onClick={handleShow}>
                ADD
              </button>
            )}
          </div>
          {productType !== "default" && <div className="cust">customized</div>}

          <Modal className="modeldialog" show={show} onHide={handleClose}>
            {renderModalContent()}
          </Modal>
        </div>
      </div>
    </>
  );
};

export default PizzaPage;
