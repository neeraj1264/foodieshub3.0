import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Category.css";

// Import all data arrays
import {
  simplepizzadata,
  Veg1Data,
  Veg2Data,
  Veg3Data,
  TasteOfIndiaData,
  NonVegPizzaData,
  CombopizzaData,
  VegburgerData,
  ChickenburgerData,
  NonVegSplData,
  NonVegSoupData,
  ChickenSnackData,
  WrapData,
  MojitoData,
  VegSplData,
  MainCourseData,
  NonVegMainData,
  CoffeeData,
  ShakeData,
  IcecreamData,
  FriesData,
  SaladData,
  SandwichData,
  SidesData,
  MushromData,
  MainData,
  ComboMixData,
  VegetablesData,
  MaggieData,
  PaneerData,
  NoodlesData,
  MomosData,
  SizzlersData,
  PastaData,
  SaladandRaitaData,
  VegSnacksData,
  RotiData,
  TandooriNonVegData,
} from "../data/FoodData"; // Update the import path

// Mapping category names to their data arrays
const categoryToDataMap = {
  Simple_Pizza: simplepizzadata,
  Veg_1: Veg1Data,
  Veg_2: Veg2Data,
  Veg_3: Veg3Data,
  Combo_Pizza: CombopizzaData,
  Taste_Of_India: TasteOfIndiaData,
  Non_Veg_Pizza: NonVegPizzaData,
  Veg_burger: VegburgerData,
  Chicken_burger: ChickenburgerData,
  Non_Veg_Special: NonVegSplData,
  Non_Veg_Soup: NonVegSoupData,
  Chicken_Snack: ChickenSnackData,
  Wrap: WrapData,
  Mojito: MojitoData,
  Veg_Special: VegSplData,
  Main_Course: MainCourseData,
  Non_Veg_Main: NonVegMainData,
  Coffee: CoffeeData,
  Shake: ShakeData,
  Icecream: IcecreamData,
  Fries: FriesData,
  Salad: SaladData,
  Sandwich: SandwichData,
  Sides: SidesData,
  Mushroom: MushromData,
  Main: MainData,
  Combo_Mix: ComboMixData,
  Vegetable: VegetablesData,
  Maggie: MaggieData,
  Paneer: PaneerData,
  Noodles: NoodlesData,
  Momos: MomosData,
  Sizzlers: SizzlersData,
  Pasta: PastaData,
  SaladandRayta: SaladandRaitaData,
  VegSnacks: VegSnacksData,
  Roti: RotiData,
  Tandoori_Non_Veg: TandooriNonVegData,
};
const categories = [
    { id: 1, image: "/img/pizza.png",     name: "Simple_Pizza"},
    { id: 3, image: "/img/pizza.png",     name: 'Veg_1'},
    { id: 4, image: "/img/pizza.png",     name: 'Veg_2'},
    { id: 5, image: "/img/pizza.png",     name: 'Veg_3'},
    { id: 6, image: "/img/pizza.png",     name: 'Combo_Pizza'},
    { id: 7, image: "/img/pizza.png",     name: 'Taste_Of_India'},
    { id: 8, image: "/img/pizza.png",     name: 'Non_Veg_Pizza'},
    { id: 9, image: "/img/pizza.png",     name: 'Veg_burger'},
    { id:10, image: "/img/pizza.png",     name: 'Chicken_burger'},
    { id:11, image: "/img/pizza.png",     name: 'Non_Veg_Special'},
    { id:12, image: "/img/pizza.png",     name: 'Non_Veg_Soup'},
    { id:13, image: "/img/pizza.png",     name: 'Chicken_Snack'},
    { id:14, image: "/img/aloowrap.jpeg", name: "Wrap" },
    { id:15, image: "/img/aloowrap.jpeg", name: "Mojito" },
    { id:16, image: "/img/aloowrap.jpeg", name: "Veg_Special" },
    { id:17, image: "/img/aloowrap.jpeg", name: "Main_Course" },
    { id:18, image: "/img/aloowrap.jpeg", name: "Non_Veg_Main" },
    { id:19, image: "/img/aloowrap.jpeg", name: "Coffee" },
    { id:20, image: "/img/aloowrap.jpeg", name: "Shake" },
    { id:21, image: "/img/aloowrap.jpeg", name: "Icecream" },
    { id:22, image: "/img/aloowrap.jpeg", name: "Fries" },
    { id:23, image: "/img/aloowrap.jpeg", name: "Salad" },
    { id:24, image: "/img/aloowrap.jpeg", name: "Sandwich" },
    { id:25, image: "/img/aloowrap.jpeg", name: "Sides" },
    { id:26, image: "/img/aloowrap.jpeg", name: "Mushroom" },
    { id:27, image: "/img/aloowrap.jpeg", name: "Main" },
    { id:28, image: "/img/aloowrap.jpeg", name: "Combo_Mix" },
    { id:29, image: "/img/aloowrap.jpeg", name: "Vegetable" },
    { id:30, image: "/img/aloowrap.jpeg", name: "Maggie" },
    { id:31, image: "/img/aloowrap.jpeg", name: "Paneer" },
    { id:32, image: "/img/aloowrap.jpeg", name: "Noodles" },
    { id:33, image: "/img/aloowrap.jpeg", name: "Momos" },
    { id:34, image: "/img/aloowrap.jpeg", name: "Sizzlers" },
    { id:35, image: "/img/aloowrap.jpeg", name: "Pasta" },
    { id:36, image: "/img/aloowrap.jpeg", name: "SaladandRayta"},
    { id:37, image: "/img/aloowrap.jpeg", name: "VegSnacks" },
    { id:38, image: "/img/aloowrap.jpeg", name: "VegSnacks" },
    { id:39, image: "/img/aloowrap.jpeg", name: "Roti" },
    { id:40, image: "/img/aloowrap.jpeg", name: "Tandoori_Non_Veg" },
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
