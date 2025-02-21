import React, { useEffect, useState } from "react";
import Category from "./components/categories/Category";
import Wrap from "./components/Pages/Wrap";
import { IoMdCloseCircle } from "react-icons/io";
import Header from "./components/header/Header";
import SimplePizza from "./components/Pages/Pizza/SimplePizza";
import Veg1 from "./components/Pages/Pizza/Veg1";
import Veg2 from "./components/Pages/Pizza/Veg2";
import Veg3 from "./components/Pages/Pizza/Veg3";
import Combopizza from "./components/Pages/Pizza/ComboPizza";
import TasteOfIndia from "./components/Pages/Pizza/TasteOfIndia";
import NonVegPizza from "./components/Pages/Pizza/NonVegPizza";
import ChickenSnack from "./components/Pages/ChickenSnacks";
import NonVegSoup from "./components/Pages/NonVegSoup";
import NonVegSpl from "./components/Pages/NonVegSpl";
import Chickenburger from "./components/Pages/Chickenburger";
import Vegburger from "./components/Pages/Vegburger";
import Mojito from "./components/Pages/Mojito";
import VegSpecial from "./components/Pages/VegSpl";
import MainCourse from "./components/Pages/VegMain";
import NonVegMain from "./components/Pages/NonVegMain";
import Coffee from "./components/Pages/Coffee";
import Shake from "./components/Pages/Shakes";
import Icecream from "./components/Pages/Icecream";
import Fries from "./components/Pages/Fries";
import Salad from "./components/Pages/Salad";
import Sandwich from "./components/Pages/Sandwich";
import Sides from "./components/Pages/Sides";
import Taco from "./components/Pages/Taco";
import Mushrom from "./components/Pages/Mushroom";
import Main from "./components/Pages/Main";
import Combo from "./components/Pages/Combo";
import Vegetable from "./components/Pages/Vegetable";
import Maggie from "./components/Pages/Maggie";
import Paneer from "./components/Pages/Paneer";
import Noodles from "./components/Pages/Noodles";
import Momos from "./components/Pages/Momos";
import Sizzlers from "./components/Pages/Sizzlers";
import Pasta from "./components/Pages/Pasta";
import VegSnacks from "./components/Pages/VegSnacks";
import Roti from "./components/Pages/Roti";
import TandooriNonVeg from "./components/Pages/TandooriNonVeg";
import Mushroom from "./components/Pages/Mushroom";
import Chaap from "./components/Pages/Chaap";
import SaladandRayta from "./components/Pages/Salad&Raita";
import {
  allItems,
  ChaapData,
  ChickenburgerData,
  ChickenSnackData,
  CoffeeData,
  ComboMixData,
  CombopizzaData,
  FriesData,
  IcecreamData,
  MaggieData,
  MainCourseData,
  MainData,
  MojitoData,
  MomosData,
  MushromData,
  NonVegMainData,
  NonVegPizzaData,
  NonVegSoupData,
  NonVegSplData,
  NoodlesData,
  PaneerData,
  PastaData,
  RotiData,
  SaladandRaitaData,
  SaladData,
  SandwichData,
  ShakeData,
  SidesData,
  simplepizzadata,
  SizzlersData,
  TacoData,
  TandooriNonVegData,
  TasteOfIndiaData,
  Veg1Data,
  Veg2Data,
  Veg3Data,
  VegburgerData,
  VegetablesData,
  VegSnacksData,
  VegSplData,
  WrapData,
} from "./components/data/FoodData";
import PizzaPage from "./components/Pages/Pizza/PizzaPage";
import { useCart } from "./ContextApi";
import { useLocation } from "react-router-dom";

const menuItems = [
  { name: "Simple Veg", component: <SimplePizza />, data: simplepizzadata },
  { name: "Veg1 ", component: <Veg1 />, data: Veg1Data },
  { name: "Veg2", component: <Veg2 />, data: Veg2Data },
  { name: "Veg3", component: <Veg3 />, data: Veg3Data },
  { name: "ComboPizza", component: <Combopizza />, data: CombopizzaData },
  {
    name: "Taste Of India",
    component: <TasteOfIndia />,
    data: TasteOfIndiaData,
  },
  { name: "Non Veg Pizza", component: <NonVegPizza />, data: NonVegPizzaData },
  { name: "Vegburger", component: <Vegburger />, data: VegburgerData },
  {
    name: "Chickenburger",
    component: <Chickenburger />,
    data: ChickenburgerData,
  },
  { name: "NonVegSpl", component: <NonVegSpl />, data: NonVegSplData },
  { name: "NonVegSoup", component: <NonVegSoup />, data: NonVegSoupData },
  { name: "ChickenSnack", component: <ChickenSnack />, data: ChickenSnackData },
  { name: "Wrap", component: <Wrap />, data: WrapData },
  { name: "Mojito", component: <Mojito />, data: MojitoData },
  { name: "VegSpecial", component: <VegSpecial />, data: VegSplData },
  { name: "MainCourse", component: <MainCourse />, data: MainCourseData },
  { name: "NonVegMain", component: <NonVegMain />, data: NonVegMainData },
  { name: "Coffee", component: <Coffee />, data: CoffeeData },
  { name: "Shake", component: <Shake />, data: ShakeData },
  { name: "Icecream", component: <Icecream />, data: IcecreamData },
  { name: "Fries", component: <Fries />, data: FriesData },
  { name: "Salad", component: <Salad />, data: SaladData },
  { name: "Sandwich", component: <Sandwich />, data: SandwichData },
  { name: "Sides", component: <Sides />, data: SidesData },
  { name: "Taco", component: <Taco />, data: TacoData },
  { name: "Mushrom", component: <Mushroom />, data: MushromData },
  { name: "Main", component: <Main />, data: MainData },
  { name: "Combo_Mix", component: <Combo />, data: ComboMixData },
  { name: "Vegetable", component: <Vegetable />, data: VegetablesData },
  { name: "Maggie", component: <Maggie />, data: MaggieData },
  { name: "Paneer", component: <Paneer />, data: PaneerData },
  { name: "Noodles", component: <Noodles />, data: NoodlesData },
  { name: "Momos", component: <Momos />, data: MomosData },
  { name: "Sizzlers", component: <Sizzlers />, data: SizzlersData },
  { name: "Pasta", component: <Pasta />, data: PastaData },
  { name: "Chaap", component: <Chaap />, data: ChaapData },
  {
    name: "SaladandRayta",
    component: <SaladandRayta />,
    data: SaladandRaitaData,
  },
  { name: "VegSnacks", component: <VegSnacks />, data: VegSnacksData },
  { name: "Roti", component: <Roti />, data: RotiData },
  {
    name: "TandooriNonVeg",
    component: <TandooriNonVeg />,
    data: TandooriNonVegData,
  },
];

const Digitalmenu = ({menu}) => {
  const [showCategory, setShowCategory] = useState(false); // State to toggle Category visibility
  const [searchText, setSearchText] = useState(""); // State to handle search input
  const [loading, setLoading] = useState(true); // Loading state to track the fetch status
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const { cartItemsCount } = useCart();

  const [tableNumber, setTableNumber] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const table = queryParams.get("table");
    setTableNumber(table);
    // Optionally, you could store it in localStorage or Context if needed later
    localStorage.setItem("tableNumber", table);
  }, [location]);

  useEffect(() => {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  }, []);

  const toggleCategory = () => {
    if (!showCategory) {
      setSearchText(""); // Reset search input when hiding the search bar
    }
    setShowCategory(!showCategory); // Toggle between Category and Search Input
  };

  useEffect(() => {
    setLoading(true);
  
    if (searchText.trim() === "") {
      setFilteredMenuItems(menuItems);
    } else {
      const matchedItems = allItems.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
  
      if (matchedItems.length > 0) {
        setFilteredMenuItems([
          {
            name: "Search Results",
            component: (
              <div className="search-results">
                {matchedItems.map((item) => (
                  <PizzaPage key={item.id} {...item} />
                ))}
              </div>
            ),
            data: matchedItems,
          },
        ]);
      } else {
        setFilteredMenuItems([
          {
            name: "Not Found",
            component: (
            <div className="not-found">
            <h2>No items found!</h2>
            <img
                src="/nofound.png"
              />
            </div>
            ),
            data: [],
          },
        ]);
      }
    }
  
    setLoading(false);
  }, [searchText]);
  

  useEffect(() => {
    if (cartItemsCount > 0) {
      setIsFooterVisible(true);
    } else {
      setIsFooterVisible(false);
    }
  }, [cartItemsCount]);

  return (
    <>

      {tableNumber && (
        <div className="table-info">Table Number: {tableNumber}</div>
      )}
      
      <div
        className={`menu-btn-container ${
          isFooterVisible ? "footer-visible" : ""
        }`}
      >
        <input
          type="text"
          className="menu-search"
          placeholder="Search for items..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <h1 className="menu-btn" onClick={toggleCategory}>
          {!showCategory ? "Menu" : "Hide"}
        </h1>
      </div>
      
      <div
        className={`menu-items ${
          isFooterVisible ? "footer-visible" : ""
        }`}
      >
        {loading ? (
          <h2 className="loading">Menu Loading...</h2>
        ) : (
          filteredMenuItems.map((item, index) => (
            <div key={index} className="menu-item" style={{ margin: menu ? "0" : " 2rem 1rem 1rem" }}>
              {/* Show category name only if not search results */}
              {item.name !== "Search Results" && (
                <h2 className="category-header"></h2>
              )}
              {item.component}
            </div>
          ))
        )}
      </div>

      {/* Render Categories Dynamically */}
      {showCategory && (
        <div className="outer-card">
          {/* Conditional Rendering */}
          {showCategory && <Category setShowCategory={setShowCategory} />}

          {/* Display Filtered Menu Items */}
        </div>
      )}
    </>
  );
};

export default Digitalmenu;
