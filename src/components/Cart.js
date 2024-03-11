import React from 'react'
import { useSelector } from 'react-redux'
import ItemList from './ItemList';
function Cart({items}) {
    const cartItems=useSelector((store)=>store.cart.items);
  return (
    <div className='text-center'>
        <div className='p-4 m-4 font-bold'>Cart</div>
        <div className='w-6/12 m-auto'>
        <ItemList items={cartItems}/>
        </div>
    </div>
  )
}

export default Cart