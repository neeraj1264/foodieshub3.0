import React, { useEffect, useState } from "react";
import { useCart } from "../../ContextApi";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FaMinus, FaPlus, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import "./Cart.css";
import { HashLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = ({ id }) => {
  let {
    cartItems,
    setCartItems,
    updateCartItemQuantity,
    decrementCart,
    showButtons,
    setShowButtons,
    removeCartItem,
  } = useCart();
  const productShowButtons = showButtons[id] || false;
  const [showModal, setShowModal] = useState(false);
  const [Loading, SetLoading] = useState(true);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    // pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    setTimeout(() => {
      SetLoading(false);
    }, 1000);
  });
  const handleRemoveItem = (productId) => {
    removeCartItem(productId);
  };
  //   const calculateSavingForItem = (item) => {
  //     let priceToUse;

  //     // Check if the item is a pizza with customizable prices
  //     if (typeof item.price === 'object' && 'priceR' in item.price) {
  //         priceToUse = item.priceR;
  //     } else if (typeof item.price === 'object' && 'priceH' in item.price) {
  //         priceToUse = item.priceH;
  //     } else {
  //         priceToUse = item.price;
  //     }

  //     console.log('item.mrp:', item.mrp);
  //     console.log('priceToUse:', priceToUse);
  //     console.log('item.quantity:', item.quantity);

  //     const saving = (item.mrp - priceToUse) * item.quantity;

  //     console.log('saving:', saving);

  //     return saving;
  // };

  // const calculateTotalSaving = () => {
  //     return cartItems.reduce((totalSaving, item) => {
  //         return totalSaving + calculateSavingForItem(item);
  //     }, 0);
  // };

  const calculateTotalForcartItem = (item) => {
    const basePrice = item.price * item.quantity;

    const toppingsPrice = item.toppings
      ? item.toppings.reduce((sum, topping) => sum + topping.price, 0) * item.quantity
      : 0;

    const cheesesPrice = item.cheeses
      ? item.cheeses.reduce((sum, cheese) => sum + cheese.price, 0) *
        item.quantity
      : 0;

    return basePrice + toppingsPrice + cheesesPrice;
  };

  const calculateTotalForItem = (item) => {
    const basePrice = item.price;

    return basePrice;
  };
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const basePrice = item.price * item.quantity;

      const toppingsPrice = item.toppings
      ? item.toppings.reduce((sum, topping) => sum + topping.price, 0) * item.quantity
      : 0;

      const cheesesPrice = item.cheeses
        ? item.cheeses.reduce((sum, cheese) => sum + cheese.price, 0) *
          item.quantity
        : 0;

      return total + basePrice + toppingsPrice + cheesesPrice;
    }, 0); // Assuming 20 is the initial total (Service Charge)
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Update showButtons state for each item in cartItems to true
    const updatedShowButtons = {};
    cartItems.forEach((item) => {
      updatedShowButtons[item.id] = true;
    });
    setShowButtons(updatedShowButtons);
  }, [cartItems, setShowButtons]);

  useEffect(() => {
    // Save scroll position when component unmounts
    const scrollPosition = window.scrollY;
    return () => {
      window.scrollTo(0, scrollPosition);
    };
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    SetLoading(true);
    setTimeout(() => {
      navigate(-1);
    }, 450);
  };

  const handleNext = () => {
    let total = calculateTotal();
    if (total < 170) {
      toast.error("Minimum order amount is ₹150", toastOptions);
    } else {
      navigate("/address");
    }
  };
  const dec = (index) => {
    const updatedQuantity = cartItems[index].quantity - 1;
    if (updatedQuantity <= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(index, 1);
      // updateCartItemQuantity(cartItems[index].id, 0);
      handleRemoveItem(cartItems[index].id);
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Update localStorage
      decrementCart();
      setShowButtons(productShowButtons);
    } else {
      // If the updated quantity is greater than 0, update the quantity
      updateCartItemQuantity(cartItems[index].id, updatedQuantity);
    }

    localStorage.getItem("cartItems", cartItems);
  };

  const inc = (index) => {
    // Assuming index is the index of the item in the cartItems array
    const updatedQuantity = cartItems[index].quantity + 1;
    updateCartItemQuantity(cartItems[index].id, updatedQuantity);
    localStorage.getItem("cartItems", cartItems);
  };

  useEffect(() => {
    // ... (Remaining code for useEffect)
    if (cartItems.length === 0) {
      setShowModal(true);
    }
  }, [cartItems]);

  const handlePlaceOrder = () => {
    const whatsappNumber = "+917404339777";
    // const whatsappNumber = "+917015823645";

    // Construct the WhatsApp message
    function getRandom4DigitNumber() {
      return Math.floor(1000 + Math.random() * 9000);
    }
    const orderId = getRandom4DigitNumber();

    // Retrieve the table number (either from localStorage or Context)
  const tableNumber = localStorage.getItem("tableNumber") || "";
  const tableMessage = tableNumber ? `Table no.  : *${tableNumber}*` : "";

    const orderDetails = cartItems.map((item) => {
      const addonsDetails = item.addons
        ? item.addons.map((addon) => `Addons\n${addon.name} + ₹${addon.price}\n`)
        : [];
  
        const cheesesDetails = item.cheeses
        ? item.cheeses.map((cheese) => `${cheese.name} + ₹${cheese.price}\n\n`)
        : [];
  
      return `${item.quantity}.0 x ${item.name}= ${calculateTotalForItem(item)}\n${addonsDetails.join("\n")}\n${cheesesDetails.join("")}`;
    });

   const productDetails = orderDetails.join("");
  const total = calculateTotal();

    const message = `
Order      : *ORD-${orderId}*
Amount   : *₹${total}*
${tableMessage}
    ----------Items----------\n
${productDetails}
`;

    const whatsappLink =
      "https://api.whatsapp.com/send?phone=" +
      whatsappNumber +
      "&text=" +
      encodeURIComponent(message);

    window.open(whatsappLink, "_blank");
 
  };

  return (
    <>
      <div className="cart-page">
        <h2 className="cart-header">Shopping Cart</h2>
        {Loading ? (
          <HashLoader
            color="var(--yellow)"
            style={{ position: "absolute", top: "50%", left: "50%" }}
          />
        ) : (
          <>
            {cartItems.length > 0 ? (
              <>
                <table className="cart-table">
                  {/* <thead>
                <tr>
                  <th colSpan='1'>Image</th>
                  <th colSpan='1'>Name</th>
                  <th colSpan='1'>Quantity</th>
                  <th colSpan='1'>Net Price</th>
                </tr>
              </thead> */}
                  <tbody>
                    {cartItems.length > 0 ? (
                      cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img src={item.image} alt={item.name} />
                          </td>
                          <td colSpan="2">
                            <div
                            className="cart-item-name"
                            >
                              {item.name}
                            </div>
                            {item.toppings && (
                              <div style={{ color: "grey", fontSize: ".8rem" }}>
                                Extra Topping
                                {item.toppings.map((addon) => (
                                  <div
                                    key={addon.name}
                                  >
                                    {addon.name} - ₹{addon.price}
                                  </div>
                                ))}
                              </div>
                            )}
                            {item.cheeses && (
                              <div  style={{ color: "grey", fontSize: ".8rem" }}>
                                Addons
                                {item.cheeses.map((cheese) => (
                                  <div
                                    key={cheese.name}
                                    style={{ color: "grey", fontSize: ".8rem" }}                                  >
                                    {cheese.name} - ₹{cheese.price}
                                  </div>
                                ))}
                              </div>
                            )}
                          </td>
                          <td>
                            <div
                              style={{
                                //  width: "6rem",
                                //  padding: '0 1rem',
                                display: "flex",
                                border: "none",
                                margin: "auto",
                              }}
                            >
                              <button
                                onClick={() => dec(index)}
                                style={{
                                  background: "var(--in)",
                                  color: "var(--yellow)",
                                  borderRadius: "0.8rem 0 0 0.8rem",
                                  border: "none",
                                  paddingBottom: "0.3rem",
                                  fontSize: "1rem",
                                }}
                              >
                                <FaMinusCircle />
                              </button>
                              <span
                              className="cart-item-quantity"
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => inc(index)}
                                style={{
                                  background: "var(--in)",
                                  color: "var(--yellow)",
                                  borderRadius: "0 0.8rem 0.8rem 0",
                                  border: "none",
                                  paddingBottom: "0.3rem",
                                  fontSize: "1rem",
                                }}
                              >
                                <FaPlusCircle />
                              </button>
                            </div>
                          </td>
                          <td
                          className="cart-item-total"
                          >
                            ₹{calculateTotalForcartItem(item)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">Your cart is empty</td>
                      </tr>
                    )}

                    {/* Row for the Service Charge */}
                    {cartItems.length > 0 && (
                      <tr>
                        <td colSpan="5" style={{border: "none"}}></td>
                        </tr>
                    )}
                {cartItems.length > 0 && (
                  <tr>
                    <td colSpan="4" className="delivery-row">
                      Delivery Charge Free<span className="Kilometer">[Upto 5Km]</span>
                    </td>
                    <td className="Delivery-amount">₹0</td>
                  </tr>
                )}

                  {/* Empty Row */}
                  {cartItems.length > 0 && (
                      <tr>
                        <td colSpan="5" style={{border: "none"}}></td>
                        </tr>
                    )}

                      {/* Empty Row */}
                  {cartItems.length > 0 && (
                      <tr>
                        <td colSpan="5" style={{border: "none"}}></td>
                        </tr>
                    )}

                    {/* Row for the sum of net prices */}
                    {cartItems.length > 0 && (
                      <tr>
                        <td colSpan="1" style={{border: "none"}}></td>
                        <td
                          colSpan="3"
                          className="nettotal"
                          // style={{ textAlign: "center", fontWeight: 800 , fontSize: "1rem" , border: "none"}}
                        >
                          Net Total: <span style={{marginLeft:"1rem"}}>₹{calculateTotal()}/-</span>
                        </td>
                        {/* <td
                          style={{
                            fontWeight: 800,
                            textAlign: "left",
                            paddingRight: ".5rem",
                            paddingLeft: "1rem"
                          }}
                        >
                          ₹{calculateTotal()}
                        </td> */}
                        <td colSpan="1" style={{border: "none"}}></td>
                        </tr>
                     
                    )}
                    {/* Row for the total saving */}
                    {/* {cartItems.length > 0 && (
                  <tr>
                    <td colSpan='1'></td>
                    <td
                      colSpan="2"
                      style={{ textAlign: "center", color: "green" , fontWeight: 800}}
                    >
                      Total Saving: ₹{calculateTotalSaving()}
                    </td>
                    <td  colSpan='1'>
                    </td>
                  </tr>
                )} */}
                  </tbody>
                </table>
                <div className="cart-navigation-buttons">
                  <button className="back-btn" onClick={() => handleBack()}>
                    Back
                  </button>
                  <button
                   className="btnn btn-success"
                    onClick={() => handlePlaceOrder()}
                  >
                    Place Order
                  </button>
                </div>
                <ToastContainer />
              </>
            ) : (
              <ComingSoonModal onClose={() => navigate("/menu")} />
            )}
          </>
        )}
      </div>
    </>
  );
};

const ComingSoonModal = ({ onClose }) => (
  <Modal show={true} backdrop="static" centered>
    <Modal.Body>
      <p>
        Your cart is empty please <br /> Add item in cart{" "}
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button
        variant="secondary"
        style={{ background: "#d32e2e", border: "none" }}
        onClick={onClose}
      >
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default Cart;
