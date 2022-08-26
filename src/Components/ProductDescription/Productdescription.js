import React, { Component } from 'react'
import './Productdescription.css'

class Productdescription extends Component {
  render() {
    return (
      <div className='productdescription'>
            <div className='productdesc-container'>
                <div className='prdt-desc-small-image'>
                    <div className='prdt-desc-small-image-children'>
                        <img src='' alt=''/>
                    </div>
                    <div className='prdt-desc-small-image-children'>
                        <img src='' alt=''/>
                    </div>
                    <div className='prdt-desc-small-image-children'>
                        <img src='' alt=''/>
                    </div>
                </div>

                <div className='prdt-desc-big-image'>
                    <img src='' alt=''/>
                </div>

                <div className='prdt-desc-props'>
                    <div className='prdt-desc-props-title'>
                        <p className='prdt-desc-props-title-p'>Apollo Running Shorts</p>
                    </div>
                    <div className='prdt-desc-props-size'>
                        <p className='prdt-desc-props-size-p'>Size:</p>
                        <div className='prdt-desc-props-size-container'>
                            <div className='product-desc-xs'>
                                <p>XS</p>
                            </div>
                            <div className='product-desc-s'>
                                <p>S</p>
                            </div>
                            <div className='product-desc-m'>
                                <p>M</p>
                            </div>
                            <div className='product-desc-l'>
                                <p>L</p>
                            </div>
                        </div>
                    </div>

                    <div className='prdt-desc-props-color'>
                        <p className='prdt-desc-props-color-p'>Color:</p>
                        <div className='product-desc-color-boxes'>
                            <div className='product-desc-color-box'></div>
                            <div className='product-desc-color-box'></div>
                            <div className='product-desc-color-box'></div>
                        </div>
                    </div>

                    <div className='prdt-desc-props-price'>
                        <p className='prdt-desc-props-price-p'>Price:</p>
                        <p className='prdt-desc-props-price-p2'>$50.00</p>
                    </div>

                    <button className='prdt-desc-props-tocart-btn'>Add to cart</button>

                    <div className='prdt-desc-props-desc'>
                        <p>prdt-desc-propsprdt-desc-propsprdt-desc-propsprdt-desc-propsprdt-desc-propsprdt-desc-propsprdt-desc-propsprdt-desc-propsprdt-desc-propsprdt-desc-propsprdt-desc-propsprdt-desc-props</p>
                    </div>
                </div>

            </div>
      </div>
    )
  }
}

export default Productdescription