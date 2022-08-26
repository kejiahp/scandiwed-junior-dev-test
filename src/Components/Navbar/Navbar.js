import React, { Component } from 'react'
import './Navbar.css'
import { Cart,CurrencyDropDown,Logo,Cartwheels,Logosmile1,Logosmile2,CurrencyDropUp } from '../../img/NavIcons'
import Navcart from '../Navbarcart/Navcart'
import Navbarcurrency from '../Navbarcurrency/Navbarcurrency'
import Backdrop from '../Backdrop/Backdrop'
import { withRouter } from 'react-router-dom'

class Navbar extends Component{
    state = {
        navcart: false,
        navcurr: false
    }

    backdropcloseHandler = () => {
        this.setState({navcart:false})
    }

    viewCartHandler = () => {
        this.setState({navcart:false})
        this.props.history.push("/cart")
      }

    render () {
        return (<>
        <Backdrop show={this.state.navcart} clicked={this.backdropcloseHandler}/>
                <div className='navbar'>
                    <ul>
                        <li><a href='/'>All</a></li>
                        <li><a href='/'>Clothes</a></li>
                        <li><a href='/'>Tech</a></li>
                    </ul>
            
                    <div className='logo-icons'>
                        <Logo />
                        <Logosmile1 classname={'logo-smile1'}/>
                        <Logosmile2 classname={'logo-smile2'}/>
                    </div>
            
                    <div className='nav-icons'>
                        <div className='currency' onClick={() => this.setState({navcurr: !this.state.navcurr})}>
                            <p className='currency-text'>$</p>
                            {this.state.navcurr ? <CurrencyDropUp classname={'drop-icon'} /> : <CurrencyDropDown classname={'drop-icon'} />}
                        </div>
                        {this.state.navcurr && <div className='navcur-container'>
                            <Navbarcurrency />
                        </div>}
                        <div className='cart-icon' onClick={() => this.setState({navcart: !this.state.navcart})}>
                            <Cart />
                            <Cartwheels classname={'cart-wheel1'}/>
                            <Cartwheels classname={'cart-wheel2'}/>
                            <div className='cart-count'>
                                <p>3</p>
                            </div>
                        </div>
                        {this.state.navcart && <div className='navcart-container'>
                            <Navcart viewcart={this.viewCartHandler} />
                        </div>}
                    </div>
                    
                </div>
                </>
          )   
    }
}

export default withRouter(Navbar)