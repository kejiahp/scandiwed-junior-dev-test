import React, { Component } from 'react'
import './Navbarcurrency.css'
import { connect } from 'react-redux';
import { usdCurrency, audCurrency, gbpCurrency, jpyCurrency, rubCurrency } from '../../state-management/actions/currency-actions';


class Navbarcurrency extends Component {
  render() {
    return (
      <div className='currency-container'>
            <div onClick={() => this.props.usdCurrency()} className='currency-type'>
                <p>$ USD</p>
            </div>
            <div onClick={() => this.props.gbpCurrency()} className='currency-type'>
                <p>£ GBP</p>
            </div>
            <div onClick={() => this.props.audCurrency()} className='currency-type'>
                <p>A$ AUD</p>
            </div>
            <div onClick={() => this.props.jpyCurrency()} className='currency-type'>
                <p>¥ JPY</p>
            </div>
            <div onClick={() => this.props.rubCurrency()} className='currency-type'>
                <p>₽ RUB</p>
            </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    currency: state.curr.label
  }
}

const mapDispatchToProps = () => {
  return{
    usdCurrency,audCurrency,gbpCurrency,jpyCurrency,rubCurrency
  }
}

export default connect(mapStateToProps,mapDispatchToProps())(Navbarcurrency)