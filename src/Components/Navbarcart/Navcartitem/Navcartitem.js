import React, { Component } from 'react'
import './Navcartitem.css'
import {connect} from 'react-redux'
import { removeSome,addMore } from '../../../state-management/actions/cart-actions'

class Navcartitem extends Component {
  render() {
    return (
      <div className='nav-cart-item'>
        <section className='text-section'>
          <div className='text-title-sect'>
          <p className='text-title-sect-pa'>{this.props.brand}</p>
            <p className='text-title-sect-p'>{this.props.name}</p>
            <p><strong>{this.props.symbol}{Number(this.props.totalPrice).toLocaleString()}</strong></p>
          </div>

          {this.props.textAttributes.length !== 0 ?

          this.props.textAttributes.map((item,index) => (
          <div key={index} className='text-size-sect'>
            <p className='text-size-sect-p'><small>{Object.keys(item)[0]}:</small></p>
            <div className='size-boxes'>
                    <div className='xs'>
                      <p>{Object.values(item)[0]}</p>
                    </div>
            </div>
          </div>

          ) )

          : null}

          {this.props.swatchAttributes.length !== 0 ?

          this.props.swatchAttributes.map((item,index) => (            
          <div key={index} className='text-color-sect'>
            <p className='text-color-sect-p'><small>{Object.keys(item)[0]}:</small></p>
            <div className='color-boxes'>
              {
                this.props.swatchAttributes.map(item => (
                <div className="color-box">
                    <div style={{
                      backgroundColor:`${Object.values(item)[0]}`,
                      width: '15px',
                      height: '15px',
                      margin: '1px'
                    }}></div>
                </div>
                ))
              }
            </div>
          </div>
          ))

          :null}

        </section>

        <section className='item-count'>
          <div onClick={() => this.props.addMore(this.props.mainItem)} className='plus-btn'>
            <p>+</p>
          </div>
          <div className='item-counter'>
            <p>{this.props.quantity}</p>
          </div>
          <div onClick={() => this.props.removeSome(this.props.mainItem)} className='minus-btn'>
            <p>-</p>
          </div>
        </section>
        
        <section className='image-section'>
          <img src={this.props.gallery[0]} alt=''/>
        </section>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {cart: state.cart}
}

const mapDispatchToProps = () => {
  return {removeSome, addMore}
}

export default connect(mapStateToProps,mapDispatchToProps())(Navcartitem)