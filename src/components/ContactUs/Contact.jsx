import React, { useState } from "react";
import "./Contact.css";
import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import HomeFooter from "../footer/HomeFooter";
import { useInView } from "react-intersection-observer";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    message: "",
  });

  const { ref: formRef, inView: formInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const location = useLocation();

  const [submitting, setSubmitting] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "number") {
      setPhoneNumberError(/^\d{10}$/.test(value) ? "" : "Invalid phone number");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.number)) {
      setPhoneNumberError("Invalid phone number");
      return;
    }

    setPhoneNumberError("");
    setSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xanqbpan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({ name: "", number: "", message: "" });
      } else {
        alert("Form submission failed!");
      }
    } catch {
      alert("Error submitting form. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {location.pathname === "/feedback" && <Header />}

      <section className="container">
        <div className="contact-header" id="feedback">
          <h2>
            Get in <span>Touch</span>
          </h2>
          <p>
            Have questions or need support? Reach out to us, and we'll get back
            to you as soon as possible.
          </p>
        </div>

        <div
          ref={formRef}
          className={`contact-form-container ${
            formInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {" "}
          <form onSubmit={handleSubmit} className="contact-form">
            <label>
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Enter your number"
                required
              />
              {phoneNumberError && (
                <span className="error-message">{phoneNumberError}</span>
              )}
            </label>

            <label>
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                required
              ></textarea>
            </label>

            <button type="submit" disabled={submitting} className="submit-btn">
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </section>

      {location.pathname === "/feedback" && <HomeFooter />}
    </>
  );
};

export default Feedback;
