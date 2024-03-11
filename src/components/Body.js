import React, { useEffect } from "react";
//import RestaurantContainer from './RestaurantContainer';
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import resList from "../../Data";
import { useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  useEffect(() => {
    fetchData();
    //console.log("useeffect called");
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        //https://proxy.cors.sh/
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      console.log("Fetched JSON data:", json);

      const restaurants =
        json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      if (restaurants && restaurants.length > 0) {
        console.log("Setting restaurants in state:", restaurants);
        setListOfRestaurants(restaurants);
        setFilteredRestaurant(restaurants);
      } else {
        console.error("No restaurants found in JSON data:", json);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Spinning loader
  if (listOfRestaurants.length == 0) {
    return <Shimmer />;
    //return <h1>Loading....</h1>
  }

  // const fetchData = async () => {
  //   const data = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
  //   );
  //   const json = await data.json();
  //   console.log(json);
  //   //setListOfRestaurants(json.data.success.cards[4].gridWidget.gridElements.restaurants);
  //   setListOfRestaurants(
  //     json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
  //   );
  //   //  setListOfRestaurants(json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants);
  // };

  // const fetchData = async () => {
  //   try {
  //     const data = await fetch(
  //       "https://www.swiggy.com/mapi/homepage/getCards?lat=28.4743879&lng=77.50399039999999"
  //     );
  //     const json1 = await data.json();
  //     console.log(json1);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  return (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black rounded-lg h-9 "
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg font-bold"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="px-4 py-2 m-4 bg-gray-100 rounded-lg font-bold"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          // <RestaurantCard key={restaurant.info.id} resData={restaurant.info} />
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant.info} />
            ) : (
              <RestaurantCard resData={restaurant.info} />
            )}
          </Link>
        ))}

        {/* {resList.map((restaurant)=>(
          <RestaurantCard key={restaurant.data.id} resData={restaurant}/>
        ))} */}
        {/* <RestaurantCard
      resData={resObj}
      /> */}
        {/* <RestaurantCard
      resName="kalika haveli"
      cuisines="Biryani, Chineese, Shake"
      /> */}
      </div>
    </div>
  );
};

export default Body;
