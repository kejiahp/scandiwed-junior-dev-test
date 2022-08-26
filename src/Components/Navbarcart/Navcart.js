import React, { Component } from 'react'
import './Navcart.css'
import Navcartitem from './Navcartitem/Navcartitem'

class Navcart extends Component {
  render() {
    return (
      <div className='nav-cart'>
        <p><strong>My Bag</strong>, 0 items</p>
        <Navcartitem />
        <Navcartitem />
        <section className='total-section'>
            <p><strong>Total</strong></p>
            <p><strong>$200.00</strong></p>
        </section>
        <section className='nav-cart-btn'>
            <button className='view-bag-btn' onClick={this.props.viewcart}>VIEW BAG</button>
            <button className='check-out-btn'>CHECK OUT</button>
        </section>
      </div>
    )
  }
}

export default Navcart