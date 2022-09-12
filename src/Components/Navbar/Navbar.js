import React, { Component } from 'react'
import './Navbar.css'
import { Cart,CurrencyDropDown,Logo,Cartwheels,Logosmile1,Logosmile2,CurrencyDropUp } from '../../img/NavIcons'
import Navcart from '../Navbarcart/Navcart'
import Navbarcurrency from '../Navbarcurrency/Navbarcurrency'
import Backdrop from '../Backdrop/Backdrop'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { allCategory, clothesCategory, techCategory } from '../../state-management/actions/actions'

class Navbar extends Component{
    state = {
        navcart: false,
        navcurr: false
    }

    componentDidMount() {
        //Category Select styling
        const all = document.querySelector("#all")
        const clothes = document.querySelector("#clothes")
        const tech = document.querySelector("#tech")

        if(this.props.selectedCategory === 'all') {
            all.className="lol"
            tech.className = ''
            clothes.className = ''
        }
        if(this.props.selectedCategory === 'clothes') {
            clothes.className="lol"
            tech.className = ''
            all.className = ''
        }
        if(this.props.selectedCategory === 'tech') {
            tech.className='lol'
            all.className = ''
            clothes.className = ''
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if(prevProps.selectedCategory !== this.props.selectedCategory){
            //Category Select styling
            const all = document.querySelector("#all")
            const clothes = document.querySelector("#clothes")
            const tech = document.querySelector("#tech")

            if(this.props.selectedCategory === 'all') {
                all.className="lol"
                tech.className = ''
                clothes.className = ''
            }
            if(this.props.selectedCategory === 'clothes') {
                clothes.className="lol"
                tech.className = ''
                all.className = ''
            }
            if(this.props.selectedCategory === 'tech') {
                tech.className='lol'
                all.className = ''
                clothes.className = ''
            }
        }

        if(prevProps.currency !== this.props.currency){
            this.setState({navcurr: false})   
        }
        

    }

    backdropcloseHandler = () => {
        this.setState({navcart:false})
    }

    viewCartHandler = () => {
        this.setState({navcart:false})
        this.props.history.push("/cart")
    }

    isCartEmpty = () => {
        if(this.props.cartNo.cartItemNumber !==0 ) {
            alert('Currency can only be changed if cart is empty')
        }
        else{
            this.setState({navcurr: !this.state.navcurr})   
        }
    }

    goHome = () => {
        this.props.history.push("/")
    }


    render () {

        return (<>
        <Backdrop show={this.state.navcart} clicked={this.backdropcloseHandler}/>
                <div className='navbar'>
                    <ul>
                        <li id='all' onClick={() => this.props.allCategory()}><span> All </span></li>
                        <li id='clothes' onClick={() => this.props.clothesCategory()}><span> Clothes </span></li>
                        <li id='tech' onClick={() => this.props.techCategory()}><span> Tech </span></li>
                    </ul>
            
                    <div className='logo-icons' onClick={this.goHome}>
                        <Logo />
                        <Logosmile1 classname={'logo-smile1'}/>
                        <Logosmile2 classname={'logo-smile2'}/>
                    </div>
            
                    <div className='nav-icons'>
                        <div className='currency' onClick={this.isCartEmpty}>
                            <p className='currency-text'>$</p>
                            {this.state.navcurr ? <CurrencyDropUp classname={'drop-icon'} /> : <CurrencyDropDown classname={'drop-icon'} />}
                        </div>
                        {/* currency can only be changed if cart is empty */}
                        {this.props.cartNo.cartItemNumber === 0 && this.state.navcurr && <div className='navcur-container'>
                            <Navbarcurrency />
                        </div>}
                        <div className='cart-icon' onClick={() => this.setState({navcart: !this.state.navcart})}>
                            <Cart />
                            <Cartwheels classname={'cart-wheel1'}/>
                            <Cartwheels classname={'cart-wheel2'}/>
                            <div className='cart-count'>
                                <p>{this.props.cartNo.cartItemNumber}</p>
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

const mapStateToProps = (state) => {
    return (
       { selectedCategory: state.categ.category, cartNo: state.cart, currency: state.curr.label}
    )
}
const mapDispatchToProps = () => {
    return (
        {
            allCategory,techCategory,clothesCategory
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(Navbar))