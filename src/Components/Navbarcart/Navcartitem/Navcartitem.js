import React, { Component } from 'react'
import './Navcartitem.css'

class Navcartitem extends Component {
  render() {
    return (
      <div className='nav-cart-item'>
        <section className='text-section'>
          <div className='text-title-sect'>
            <p className='text-title-sect-p'>Apollo Running Shirt</p>
            <p><strong>$50.00</strong></p>
          </div>

          <div className='text-size-sect'>
            <p className='text-size-sect-p'><small>Size:</small></p>
            <div className='size-boxes'>
              <div className='xs'>
                <p>XS</p>
              </div>
              <div className='s'>
                <p>S</p>
              </div>
              <div className='m'>
                <p>M</p>
              </div>
              <div className='l'>
                <p>L</p>
              </div>
            </div>
          </div>

          <div className='text-color-sect'>
            <p className='text-color-sect-p'><small>Color:</small></p>
            <div className='color-boxes'>
              <div className='color-box'></div>
              <div className='color-box'></div>
              <div className='color-box'></div>
            </div>
          </div>
        </section>

        <section className='item-count'>
          <div className='plus-btn'>
            <p>+</p>
          </div>
          <div className='item-counter'>
            <p>1</p>
          </div>
          <div className='minus-btn'>
            <p>-</p>
          </div>
        </section>
        
        <section className='image-section'>

        </section>
      </div>
    )
  }
}

export default Navcartitem