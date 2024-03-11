import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
// import '../../';
import "../index.css";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Cart from "./components/Cart";
import Body from "./components/Body";
// import RestaurantCard from './components/RestaurantCard';
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./components/UserContext";
import appStore from "./Utils/appStore";
import { Provider } from "react-redux";
// const heading = React.createElement(
//   "h1",
//   { id: "parent" },
//   React.createElement("h4", { id: "child" }, "I'm child h4"),
//   "i'm father h1"
// );

//Food ordering website

//JS object
//const resObj=


const AppLayout = () => {
  const [userName,setUserName]=useState();
useEffect(()=>{
  const data={
    name:"vijay",
  };
  setUserName(data.name);
},[]);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{loggedInUser:userName}}>
      <div>
      <Header />
      <Outlet />
    </div>
    </UserContext.Provider>
    </Provider>
    
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children:[
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path:"/cart",
        element: <Cart/>,
      },
    ],
    errorElement: <Error />,
  },
  
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
//console.log(heading);
root.render(<RouterProvider router={appRouter} />);
