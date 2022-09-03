import React, { Component } from 'react'
import './Categoryitem.css'
import { Whitechart,Whitecartwheel } from '../../../img/NavIcons'
import { withRouter } from 'react-router-dom'
import { openSelector, closeSelector } from '../../../state-management/actions/actions'
import { connect } from 'react-redux'

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
        this.props.history.push({
            pathname: '/product',
            state: {id:this.props.id}
        })
    }

    closeAttributeSelector = () => {
        this.props.openSelector(this.props.id)
    }

  render() {
    let itemstyle = 'category-item'

    if(this.state.over) {
        itemstyle = 'category-item category-item-shadow'
    }
    if(this.props.instock === false) {
        itemstyle = 'category-item-unavailable'
    }

    return (
    <div className={itemstyle} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        <div onClick={this.toDescriptionHandler}>

            {this.props.instock === false && <p className='out-stock'>OUT OF STOCK</p>}
            <div className='item-image'>
                <img src={this.props.image} alt={this.props.name}/>
            </div>
            <div className='item-text-holder'>
                <p className='item-header'>{this.props.name}</p>
                <p className='item-subheader'>{this.props.symbol}{this.props.price.toLocaleString( {style: 'currency', minimumFractionDigits: 2})}</p>
            </div>

        </div>

        {this.state.over && 
            <div onClick={this.closeAttributeSelector} className='add-to-cart-icon'>
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


const mapStateToProps = (state) => {
    return(
      {category_name: state.categ.category, currency: state.curr.label, selector: state.categ.attributeSelector}
    )
  }


const mapDispatchToProps = () => {
    return {
        openSelector, closeSelector
    }
}

export default connect(mapStateToProps,mapDispatchToProps())(withRouter(Categoryitem))