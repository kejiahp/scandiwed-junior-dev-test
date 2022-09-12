import React, { Component } from 'react'
import './Cart.css'
import Cartitem from './CartItem/Cartitem'
import { connect } from 'react-redux'

class Cart extends Component {
  render() {
    return (
      <div className='cart'>
        <h1>CART</h1>
        <div className='cartitems-container'>
            {this.props.cart.cartItems.map((item,index) => <Cartitem key={index} name={item.name} brand={item.brand} totalPrice={item.totalPrice} symbol={item.symbol} gallery={item.gallery} quantity={item.quantity} textAttributes={item.attributes.text} swatchAttributes={item.attributes.swatch} mainItem={item}/> )}
        </div>
        <div className='cart-tax'>
            <p>Tax 21%:   <strong>{this.props.currency.symbol} { Math.abs( Number (21/100 * this.props.cart.cartTotalPrice) ).toLocaleString()  }</strong></p>
        </div>
        <div className='cart-quant'>
            <p>Quantity: <strong>{this.props.cart.cartItemNumber}</strong></p>
        </div>
        <div className='cart-total'>
            <p>Total:       <strong>{this.props.currency.symbol} { Math.abs(Number(this.props.cart.cartTotalPrice)).toLocaleString()}</strong></p>
        </div>
        <button className='cart-order-button'>Order</button>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {cart: state.cart, currency: state.curr}
}

const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps,mapDispatchToProps())(Cart)