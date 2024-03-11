import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import { useSelector } from "react-redux";
const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  // useEffect(()=>{
  //   //console.log("useeffect called");
  // });

  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  return (
    <div className="flex justify-between bg-pink-200 font-bold">
      <div className="w-[70px] h-[70px] rounded-3xl">
        <Link to="/">
          <img
            src="https://www.restroapp.com/blog/wp-content/uploads/2016/06/future-of-online-food-ordering-by-restaurant-app-restroapp-compressed.jpg"
            alt="logo"
            className="w-[70px] h-[70px] rounded-2xl mx-2 my-2"
          ></img>
        </Link>
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">
            <Link to="/about">About</Link>
          </li>
          <li className="px-4">Order</li>
          <li className="px-4">
            <Link to="/contact">Contact us</Link>
          </li>
          <li className="px-4">
            <Link to="/cart">Cart - ({cartItems.length} items)</Link>
          </li>
          <button
            className="login-btn"
            onClick={() =>
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login")
            }
          >
            {btnName}
          </button>
          <li className="px-4 font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
