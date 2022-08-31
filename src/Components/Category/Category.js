import React, { Component } from 'react'
import './Category.css'
import Categoryitem from './CategoryItems/Categoryitem'
import { gql } from '@apollo/client/core'
// import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';
import { Query} from '@apollo/client/react/components'


class Category extends Component {

  render() {
    const getProductsQuery = gql`
    {
      category(input: {title: "${this.props.category_name}"}){
        name products{id name inStock gallery prices{currency{symbol label} amount}}
      }
    }
    `

    return (
      <section className='category'>
        <h1 className='header'>{this.props.category_name}</h1>
        <div className='item-container'>
            <Query query={getProductsQuery}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading…</p>;
                if (error) return <p>Error</p>;
                
                return data.category.products.map(items => {

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

                }}

            </Query>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return(
    {category_name: state.categ.category, currency: state.curr.label}
  )
}

export default connect(mapStateToProps)((Category))