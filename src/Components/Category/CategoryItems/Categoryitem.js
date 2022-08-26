import React, { Component } from 'react'
import './Categoryitem.css'
import { Whitechart,Whitecartwheel } from '../../../img/NavIcons'

export class Categoryitem extends Component {
    constructor(props){
        super(props)
        this.state = {
            over: false
        }
    }

  render() {
    let itemstyle = 'category-item'

    if(this.state.over) {
        itemstyle = 'category-item category-item-shadow'
    }
    if(this.props.outofstock) {
        itemstyle = 'category-item-unavailable'
    }

    return (
    <div className={itemstyle} onMouseOver={() => this.setState({over: true})} onMouseOut={() => this.setState({ over:false })}>
        {this.props.outofstock && <p className='out-stock'>OUT OF STOCK</p>}
        <div className='item-image'>
            <img src='' alt=''/>
        </div>
        <div className='item-text-holder'>
            <p className='item-header'>Apollo Shirt</p>
            <p className='item-subheader'>$50.00</p>
        </div>

        {this.state.over && 
            <div className='add-to-cart-icon'>
                <div className='add-to-cart-subfolder'>
                    <Whitechart />
                    <Whitecartwheel classname='cartwheel1'/>
                    <Whitecartwheel classname='cartwheel2'/>
                </div>
            </div>
        }

      </div>
    )
  }
}

export default Categoryitem