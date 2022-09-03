import React, { Component } from 'react'
import './Category.css'
import Categoryitem from './CategoryItems/Categoryitem'
import { connect } from 'react-redux';
import Attibuteselector from '../AttributeSelection/Attibuteselector';
import { openSelector, closeSelector } from '../../state-management/actions/actions';


class Category extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    const getProduts = async () => {
      let result = await fetch("http://localhost:4000/",{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          query: `
          {
            category(input: {title: "${this.props.category_name}"}){
              name products{id name inStock gallery prices{currency{symbol label} amount}}
            }
          }`
        })
      })

      let data = await result.json()
      return data
    }

    getProduts().then(res => {
      this.setState({data: res.data})
    })

  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.category_name !== this.props.category_name){
      const getProduts = async () => {
        let result = await fetch("http://localhost:4000/",{
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            query: `
            {
              category(input: {title: "${this.props.category_name}"}){
                name products{id name inStock gallery prices{currency{symbol label} amount}}
              }
            }`
          })
        })
  
        let data = await result.json()
        return data
      }
  
      getProduts().then(res => {
        this.setState({data: res.data})
      })
    }
  }



  render() {
    let products = ''
    if(this.state.data){
      products = (
        this.state.data.category.products.map(items => {

          //Fetching the products based on thier currency
          const price_det = {}
          items.prices.forEach(price => {
             if(price.currency.label === this.props.currency) {
              price_det["amount"] = price.amount
              price_det["symbol"] = price.currency.symbol
             }
          })

          return <Categoryitem key={items.id} name={items.name} id={items.id} instock={items.inStock} image={items.gallery[0]} price={price_det.amount} symbol={price_det.symbol}/>
        })
      )
    }

    if(this.props.selector) {document.body.style.overflow = "hidden";}
    else{document.body.style.overflow = "";}

    return (
      <section className='category'>
         {this.props.selector && <Attibuteselector clicked={() => this.props.closeSelector()} />}
        <h1 className='header'>{this.props.category_name}</h1>
        <div className='item-container'>
            {products}
        </div>
      </section>
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

export default connect(mapStateToProps,mapDispatchToProps())(Category)