import React, { Component } from 'react'
import './Cartitem.css'

class Cartitem extends Component {
  render() {
    return (
        <div className='cart-item'>
            <section className='cart-text-section'>
            <div className='cart-text-title-sect'>
                <p className='cart-text-title-sect-p'>Apollo Running Shirt</p>
                <p><strong>$50.00</strong></p>
            </div>

            <div className='cart-text-size-sect'>
                <p className='cart-text-size-sect-p'><small>Size:</small></p>
                <div className='cart-size-boxes'>
                <div className='cart-xs'>
                    <p>XS</p>
                </div>
                <div className='cart-s'>
                    <p>S</p>
                </div>
                <div className='cart-m'>
                    <p>M</p>
                </div>
                <div className='cart-l'>
                    <p>L</p>
                </div>
                </div>
            </div>

            <div className='cart-text-color-sect'>
                <p className='cart-text-color-sect-p'><small>Color:</small></p>
                <div className='cart-color-boxes'>
                <div className='cart-color-box'></div>
                <div className='cart-color-box'></div>
                <div className='cart-color-box'></div>
                </div>
            </div>
            </section>

            <section className='cart-item-count'>
            <div className='cart-plus-btn'>
                <p>+</p>
            </div>
            <div className='cart-item-counter'>
                <p>1</p>
            </div>
            <div className='cart-minus-btn'>
                <p>-</p>
            </div>
            </section>
            
            <section className='cart-image-section'>
                <img src='' alt='' />
            </section>
      </div>
    )
  }
}

export default Cartitem