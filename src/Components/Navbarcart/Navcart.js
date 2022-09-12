import React, { Component } from 'react'
import './Navcart.css'
import Navcartitem from './Navcartitem/Navcartitem'
import { connect } from 'react-redux'

class Navcart extends Component {
  render() {
    return (
      <div className='nav-cart'>
        <p className='my-bag-counter'><strong>My Bag</strong>, {this.props.cart.cartItemNumber} items</p>
        {
          this.props.cart.cartItems.map((item,index) => <Navcartitem key={index} name={item.name} brand={item.brand} totalPrice={item.totalPrice} symbol={item.symbol} gallery={item.gallery} quantity={item.quantity} textAttributes={item.attributes.text} swatchAttributes={item.attributes.swatch} mainItem={item}/>)
        }
        <section className='total-section'>
            <p><strong>Total</strong></p>
            <p><strong>{this.props.currency.symbol} {Math.abs(Number(this.props.cart.cartTotalPrice)).toLocaleString()}</strong></p>
        </section>
        <section className='nav-cart-btn'>
            <button className='view-bag-btn' onClick={this.props.viewcart}>VIEW BAG</button>
            <button className='check-out-btn'>CHECK OUT</button>
        </section>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {cart: state.cart, currency: state.curr}
}

// const mapDispatchToProps = () => {
//   return {}
// }

export default connect(mapStateToProps, null)(Navcart)