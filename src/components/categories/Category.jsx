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
  burger: BurgerData,
  chaap: ChaapData,
  dinner: DinnerData,
  garlicBread: GarlicBreadData,
  juice: JuiceData,
  naan: NaanData,
  pasta: pastaData,
  pizza: PizzaData,
  shakes: ShakesData,
  snacks: SnacksData,
  wrap: WrapData,
  sandwich: SandwichData,
};
const categories = [
  { id: 14, image: "/img/pizza.png",     name: "Sixer_Special_Combo"},
  { id: 15, image: "/img/pizza.png",     name: "Boundary_Buster_Combo"},
  { id: 16, image: "/img/pizza.png",     name: "Powerplay_Feast"},
  { id: 17, image: "/img/pizza.png",     name: "Wicket_Whopper_Combo"},
  { id: 18, image: "/img/pizza.png",     name: "Champions_Clash_Combo"},
  { id: 19, image: "/img/pizza.png",     name: "Fifty_Over_Fiesta"},
  { id: 20, image: "/img/pizza.png",     name: "TossUp_Treat_Combo"},
  { id: 21, image: "/img/pizza.png",     name: "Match_Winner_Meal"},
    { id: 1, image: "/img/pizza.png",     name: "burger"},
    { id: 8, image: "/img/pizza.png",     name: 'pasta'},
    { id: 9, image: "/img/pizza.png",     name: 'pizza'},
    { id:13, image: "/img/pizza.png",     name: 'sandwich'},
    { id: 5, image: "/img/pizza.png",     name: 'garlicBread'},
    { id:10, image: "/img/pizza.png",     name: 'shakes'},
    { id:11, image: "/img/pizza.png",     name: 'snacks'},
    { id: 3, image: "/img/pizza.png",     name: 'chaap'},
    { id: 6, image: "/img/pizza.png",     name: 'juice'},
    { id:12, image: "/img/pizza.png",     name: 'wrap'},
    { id: 4, image: "/img/pizza.png",     name: 'dinner'},
    { id: 7, image: "/img/pizza.png",     name: 'naan'},
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