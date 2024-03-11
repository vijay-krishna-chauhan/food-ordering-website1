import React from "react";

const RestaurantCard = ({ resData }) => {
  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    deliveryTime,
    sla,
  } = resData;

  //console.log(resData);
  return (
    <div className="m-4 p-4 w-[250px] h-[500px] rounded-lg bg-gray-100 hover:bg-gray-200">
      <div className="">
        <img
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            resData.cloudinaryImageId
          }
          className="rounded-lg"
        ></img>
      </div>
      <div className="card-data">
        <h3 className="font-bold py-4 text-lg">{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <div>{avgRating} ⭐</div>
        <h4>{sla.deliveryTime} minutes</h4>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
