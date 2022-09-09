import React, { Component } from 'react'
import './Cartitem.css'
import { ForwardArrow,BackwardArrow } from '../../../img/NavIcons'
import { removeSome,addMore } from '../../../state-management/actions/cart-actions'
import { connect } from 'react-redux'

class Cartitem extends Component {
    state = {
        productImages: null,
        productImage: null,
        counter: 0
    }

    changeImageForward = () => {
        if(this.props.gallery.length > 1){
            if(this.state.counter < this.props.gallery.length-1 ){
                this.setState({ counter: this.state.counter+1 })
            }
        }
    }

    changeImageBackward = () => {
        if(this.props.gallery.length > 1) {
            if(this.state.counter < this.props.gallery.length && this.state.counter > 0 ){
                this.setState({ counter: this.state.counter-1 })
            }
        }
    }

  render() {
    return (
        <div className='cart-item'>
            <section className='cart-text-section'>
            <div className='cart-text-title-sect'>
                <p className='cart-text-title-sect-pa'>{this.props.brand}</p>
                <p className='cart-text-title-sect-p'>{this.props.name}</p>
                <p><strong>{this.props.symbol}{Number(this.props.totalPrice).toLocaleString()}</strong></p>
            </div>



            {this.props.textAttributes.length !== 0 ?

            this.props.textAttributes.map((item,index) => (
            <div key={index} className='cart-text-size-sect'>
                <p className='cart-text-size-sect-p'><small>{Object.keys(item)[0]}:</small></p>
                <div className='cart-size-boxes'>
                    <div className='cart-xs'>
                        <p>{Object.values(item)[0]}</p>
                    </div>
                </div>
            </div>

            ))

            :null }


            {this.props.swatchAttributes.length !== 0 ?

                this.props.swatchAttributes.map((item,index) => (
                    <div key={index} className='cart-text-color-sect'>
                        <p className='cart-text-color-sect-p'><small>{Object.keys(item)[0]}:</small></p>
                        <div className='cart-color-boxes'>
                            <div className="color-box">
                                <div style={{
                                backgroundColor:`${Object.values(item)[0]}`,
                                width: '25px',
                                height: '25px',
                                margin: '1px'
                                }}></div>
                            </div>
                        </div>
                    </div>

                ))

            :null }


            </section>

            <section className='cart-item-count'>
            <div onClick={() => this.props.addMore(this.props.mainItem)} className='cart-plus-btn'>
                <p>+</p>
            </div>
            <div className='cart-item-counter'>
                <p>{this.props.quantity}</p>
            </div>
            <div onClick={() => this.props.removeSome(this.props.mainItem)} className='cart-minus-btn'>
                <p>-</p>
            </div>
            </section>
            
            <section className='cart-image-section'>
                <img src={this.props.gallery[this.state.counter]} alt=''/>
                <div className='cart-image-slider'>
                    <BackwardArrow clicked={this.changeImageBackward} classname={'cart-image-slider-btn'}/>
                    <ForwardArrow clicked={this.changeImageForward} classname={'cart-image-slider-btn'}/>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps())(Cartitem)