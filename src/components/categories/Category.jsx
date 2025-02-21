import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Category.css";

// Import all data arrays
import {
  BurgerData,
  ChaapData,
  DinnerData,
  GarlicBreadData,
  JuiceData,
  NaanData,
  pastaData,
  PizzaData,
  SandwichData,
  ShakesData,
  SnacksData,
  WrapData,
} from "../data/FoodData"; // Update the import path

// Mapping category names to their data arrays
const categoryToDataMap = {
  Burger: BurgerData,
  Chaap: ChaapData,
  Dinner: DinnerData,
  GarlicBread: GarlicBreadData,
  Juice: JuiceData,
  Naan: NaanData,
  pasta: pastaData,
  Pizza: PizzaData,
  Shakes: ShakesData,
  Snacks: SnacksData,
  Wrap: WrapData,
  Sandwich: SandwichData,
};
const categories = [
    { id: 1, image: "/img/pizza.png",     name: "burger"},
    { id: 3, image: "/img/pizza.png",     name: 'chaap'},
    { id: 4, image: "/img/pizza.png",     name: 'dinner'},
    { id: 5, image: "/img/pizza.png",     name: 'garlicBread'},
    { id: 6, image: "/img/pizza.png",     name: 'juice'},
    { id: 7, image: "/img/pizza.png",     name: 'naan'},
    { id: 8, image: "/img/pizza.png",     name: 'pasta'},
    { id: 9, image: "/img/pizza.png",     name: 'pizza'},
    { id:10, image: "/img/pizza.png",     name: 'shakes'},
    { id:11, image: "/img/pizza.png",     name: 'snacks'},
    { id:12, image: "/img/pizza.png",     name: 'wrap'},
    { id:13, image: "/img/pizza.png",     name: 'sandwich'},
  ].map((category) => ({
    ...category,
    itemCount: categoryToDataMap[category.name]?.length || 0,
  }));

function Category({ setShowCategory }) {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash) {
      scrollToSection(hash);
    }
  }, [location]);

  // Scroll to the section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 60; // Adjust header height dynamically
      const offset = section.offsetTop - headerHeight - 10; // Add extra margin

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  // IntersectionObserver to track when a section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use entry.target.id to set the active category
            setActiveCategory(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    categories.forEach((category) => {
      const section = document.getElementById(category.name);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="outer-card">
      {categories.map((category) => (
        <Link
          to={`#${encodeURIComponent(category.name)}`}
          key={category.id}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(category.name); // Ensure smooth scrolling first
            setTimeout(() => setShowCategory(false), 300); 
          }}
          
        >
          <h2
            className={`card-text ${
              activeCategory === category.name ? "active" : ""
            }`}
          >
            {category.name}
          </h2>
          <h2
            className={`item-count ${
              activeCategory === category.name ? "active" : ""
            }`}
          >
            {category.itemCount}
          </h2>
        
        </Link>
      ))}
    </div>
  );
}

export default Category;