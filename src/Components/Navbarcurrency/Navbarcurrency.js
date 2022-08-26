import React, { Component } from 'react'
import './Navbarcurrency.css'

class Navbarcurrency extends Component {
  render() {
    return (
      <div className='currency-container'>
        <div className='currency-type'>
            <p>$ USD</p>
        </div>
        <div className='currency-type'>
            <p>$ EUR</p>
        </div>
        <div className='currency-type'>
            <p>$ JPY</p>
        </div>
      </div>
    )
  }
}

export default Navbarcurrency