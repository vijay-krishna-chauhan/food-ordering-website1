import { useDispatch } from 'react-redux';
import React from 'react'
import { CDN_URL } from "../Utils/constants";
import { addItem } from "../Utils/cartSlice";

const ItemList = ({ items }) => {

  const dispatch = useDispatch();

  const handleAddItem=(item)=>{

    dispatch(addItem(item));
    console.log(item);
  }
  
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-b-2 border-gray-200 text-left flex justify-between"
        >
            <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute">
              <button
                className="p-2 mx-16 rounded-lg bg-black text-white shadow-lg"
                key={item.id}
                onClick={()=>handleAddItem(item)}
              >
                Add +
              </button>
            </div>
            <img src={CDN_URL + item.card.info.imageId} className="w-full" />
          </div>
        </div>
      ))}
    </div>
    //       <div>
    //         <img
    //           src={CDN_URL + item.card.info.imageId}
    //           className="w-24 p-4"
    //         ></img>
    //       </div>
    //       <div className="p-2">
    //         <p>{item.card.info.name}</p>
    //         <span>Rs. {item.card.info.price / 100}</span>{" "}
    //         <p className="text-xs p-2">{item.card.info.description}</p>
    //       </div>
    //     </div>
    //   ))}
    //   {/* <div>{items[0].card.info.name}</div> */}
    // </div>
  );
};

export default ItemList;
