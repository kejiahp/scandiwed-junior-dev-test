import React, { Component } from 'react'
import './Cart.css'
import Cartitem from './CartItem/Cartitem'

class Cart extends Component {
  render() {
    return (
      <div className='cart'>
        <h1>CART</h1>
        <div className='cartitems-container'>
            <Cartitem />
            <Cartitem />
            <Cartitem />
            <Cartitem />
        </div>
        <div className='cart-tax'>
            <p>Tax 21%:   <strong>$42.00</strong></p>
        </div>
        <div className='cart-quant'>
            <p>Quantity: <strong>3</strong></p>
        </div>
        <div className='cart-total'>
            <p>Total:       <strong>$200.00</strong></p>
        </div>
        <button className='cart-order-button'>Order</button>
      </div>
    )
  }
}

export default Cart