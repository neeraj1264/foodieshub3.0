import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../ContextApi";
import  './Confirm.css'
const ConfirmOrder = () => {

  const { cartItems, selectedAddress } = useCart();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handlePlaceOrder = () => {
    const whatsappNumber = "+917015823645";

    // Construct the WhatsApp message
    function getRandom4DigitNumber() {
      return Math.floor(1000 + Math.random() * 9000);
    }
    const orderId = getRandom4DigitNumber();
    const orderDetails = cartItems.map((item) => {
      const addonsDetails = item.addons
        ? item.addons.map((addon) => `Addons\n${addon.name} + ₹${addon.price}\n`)
        : [];
  
        const cheesesDetails = item.cheeses
        ? item.cheeses.map((cheese) => `${cheese.name} + ₹${cheese.price}\n\n`)
        : [];
  
      return `${item.quantity}.0 x ${item.name}= ₹${calculateTotalForItem(item)}\n${addonsDetails.join("\n")}\n${cheesesDetails.join("")}`;
    });

   const productDetails = orderDetails.join("");
  const total = calculateTotal();

    const message = `
Order      : *ORD-${orderId}*
Phone     : *${selectedAddress.city}*
Name      : *${selectedAddress.customerName}*
Amount   : *₹${total}*
Address  : *${selectedAddress.streetAddress}*\n
    ----------Items----------\n
${productDetails}
Service Charge: ₹20.00`;

    const whatsappLink =
      "https://api.whatsapp.com/send?phone=" +
      whatsappNumber +
      "&text=" +
      encodeURIComponent(message);

    window.open(whatsappLink, "_blank");
    setTimeout(()=>{
      navigate('/')
      // location.reload()
    },3000)

  };

  const calculateTotalForItem = (item) => {
    const basePrice = item.price * item.quantity;

    const addonsPrice = item.addons
      ? item.addons.reduce((sum, addon) => sum + addon.price, 0) * item.quantity
      : 0;

    const cheesesPrice = item.cheeses
      ? item.cheeses.reduce((sum, cheese) => sum + cheese.price, 0) *
        item.quantity
      : 0;

    return basePrice + addonsPrice + cheesesPrice;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const basePrice = item.price * item.quantity;

      const addonsPrice = item.addons
        ? item.addons.reduce((sum, addon) => sum + addon.price, 0) *
          item.quantity
        : 0;

      const cheesesPrice = item.cheeses
        ? item.cheeses.reduce((sum, cheese) => sum + cheese.price, 0) *
          item.quantity
        : 0;

      return total + basePrice + addonsPrice + cheesesPrice;
    }, 20); // Assuming 20 is the initial total (Service Charge)
  };
  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-4">Confirm Order</h2>
      {cartItems.length > 0 ? (
        <>
          <table className="table mt-2">
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-thumbnail"
                    />
                  </td>
                  <td>
                        <div style={{color: 'black' , fontWeight: '500'}}>
                        {item.name}
                        </div>
                        {item.addons && item.addons.length > 0 && (
                          <div style={{color: 'grey'}}>
                            Addons:
                            {item.addons.map((addon) => (
                              <div key={addon.name} style={{color: 'grey'}}>
                                {addon.name} - ₹{addon.price}
                              </div>
                            ))}
                          </div>
                        )}
                        {item.cheeses && (
                          <div>
                            {item.cheeses.map((cheese) => (
                              <div key={cheese.name} style={{color: 'grey'}}>
                                {cheese.name} - ₹{cheese.price}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                  <td>x</td>
                  <td>{item.quantity}</td>
                  <td>₹{calculateTotalForItem(item)}</td>
                </tr>
              ))}
              {/* Row for the Service Charge */}
              {cartItems.length > 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "left" }}>
                    Service Charge:
                  </td>
                  <td>₹20</td>
                </tr>
              )}
              {/* Row for the sum of net prices */}
              {cartItems.length > 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "left" }}>
                    Net Total:
                  </td>
                  <td>₹{calculateTotal()}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div>
            <h4>Selected Address:</h4>
            <p>
              {selectedAddress
                ? `${selectedAddress.customerName}, ${selectedAddress.streetAddress}, ${selectedAddress.city}`
                : "No address selected"}
            </p>
          </div>
          <div className="d-flex justify-content-between mt-4 pb-4">
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
        </>
      ) : (
        <p className="mt-4">Your cart is empty. Please add items to proceed.</p>
      )}
    </div>
  );
};

export default ConfirmOrder;