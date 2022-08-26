import React, { Component } from 'react'
import './Categoryitem.css'
import { Whitechart,Whitecartwheel } from '../../../img/NavIcons'
import { withRouter } from 'react-router-dom'

export class Categoryitem extends Component {
    constructor(props){
        super(props)
        this.state = {
            over: false
        }
    }

    onMouseOver = () => {
        this.setState({over: true})
    }

    onMouseOut = () => {
        this.setState({ over:false })
    }
    toDescriptionHandler = () => {
        this.props.history.push("/product")
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
    <div className={itemstyle} onClick={this.toDescriptionHandler} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
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

export default withRouter(Categoryitem)