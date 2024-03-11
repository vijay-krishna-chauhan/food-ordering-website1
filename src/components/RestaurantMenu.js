import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  const { resId } = useParams();

  // console.log(resId);
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      //"https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=" +
        resId
    );
    const json = await data.json();
    console.log(json.data);
    // console.log("data");
    setResInfo(json.data);
  };
  console.log("data");
  console.log(resInfo);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
  const categories =
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // console.log("categories "+ categories);
  // const categories= resInfo.cards[5].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.filter(c=>c.card)
  //const {name, cuisines, costForTwo}=resInfo?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants[3]?.info;
  //const {name, cuisines, costForTwo}=resInfo.cards[4].card.card.gridElements.infoWithStyle.restaurants;

  // const output=itemCards.map(
  //   (items)=>()
  // )
  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* <div>
        {itemCards.map((item, index) => (
          <h1 key={index}>{item.card.info.name}</h1>
        ))}
      </div> */}
      {/* categories accordions */}
      {categories.map((category) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
