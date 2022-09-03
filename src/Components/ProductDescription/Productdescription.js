import React, { Component } from 'react'
import './Productdescription.css'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

class Productdescription extends Component {
    state = {
        bigImage: null,
        data: null
    }

    changeImage = () => {
        if(!this.state.bigImage){
            this.setState({bigImage: this.state.data.gallery[0]})
        }
    }

    componentDidMount() {
        const getProductInfo = async () => {
            let result = await fetch("http://localhost:4000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        product(id: "${this.props.location.state.id}") {
                            id
                            name
                            description
                            brand
                            gallery
                            prices{currency{label symbol} amount}
                            attributes {
                              id
                              name
                              type
                              items {
                                displayValue
                                value
                                id
                              }
                            }
                          }
                        }`
                })
            })
    
            let data = await result.json()
            return data
        }
        getProductInfo().then(res => {
            this.setState({data: res.data.product, bigImage: res.data.product.gallery[0]})
        })
        
    
    }


  render() {

    const price_det = {}
    let selections = ''
    let smallImages
    let brand =''
    let name = ''
    let description = ''

    if(this.state.data){
        
    
    
    //Fetching the products based on thier currency
    this.state.data.prices.forEach(price => {
        if(price.currency.label === this.props.currency) {
        price_det["amount"] = price.amount
        price_det["symbol"] = price.currency.symbol
        }
    })

    
    selections = this.state.data.attributes.map(item => {
        let x = []
        if(item.type === 'text') {
            

            x.push( <div key={item.name} className='prdt-desc-props-size'>
                <p className='prdt-desc-props-size-p'>{item.name} :</p>
                <div className='prdt-desc-props-size-container'>
                    {
                        item.items.map(attr => {
                            
                            return <div key={attr.id} className='product-desc-xs'>
                                <p>{attr.displayValue}</p>
                            </div>
        })
                    }

                </div>
            </div>)
        }
        if(item.type === 'swatch'){
            x.push(
                <div key={item.id} className='prdt-desc-props-color'>
                    <p className='prdt-desc-props-color-p'>{item.name}:</p>
                    <div className='product-desc-color-boxes'>
                        { item.items.map(attr => {
                            const color ={
                                backgroundColor: `${attr.value}`
                            }
                            return <div key={attr.id} style={color} className='product-desc-color-box'></div>
                        }
                        )}
                    </div>
                </div>
            )
        }
        return x

    })

    const setBigImage = (e) => {
        this.setState({bigImage: e.target.src})
    }

    smallImages = this.state.data.gallery.map((item,index )=> {
        return <div key={index} onClick={setBigImage} className='prdt-desc-small-image-children'>
            <img src={item} alt=""/>
        </div>
    })  

    brand = this.state.data.brand
    name = this.state.data.name
    description = this.state.data.description


    }

    return (    
            <div className='productdescription'>
                <div className='productdesc-container'>
                    <div className='prdt-desc-small-image'>
                        {smallImages}
                    </div>

                    <div className='prdt-desc-big-image'>
                        <img src={this.state.bigImage} alt=''/>
                    </div>

                    <div className='prdt-desc-props'>
                        <div className='prdt-desc-props-title'>
                            <p className='prdt-desc-props-title-px'>{brand}</p>
                            <p className='prdt-desc-props-title-p'>{name}</p>
                        </div>

                        {/* Products attributes */}
                        {selections}

                        <div className='prdt-desc-props-price'>
                            <p className='prdt-desc-props-price-p'>Price:</p>
                            <p className='prdt-desc-props-price-p2'>{price_det.symbol} {Number(price_det.amount).toLocaleString( {style: 'currency', minimumFractionDigits: 2})}</p>
                        </div>

                        <button className='prdt-desc-props-tocart-btn'>Add to cart</button>

                        <div className='prdt-desc-props-desc'>
                            <p dangerouslySetInnerHTML={{__html: `${description}`}}></p>
                        </div>
                    </div>

                </div>
            </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {category_name: state.categ.category, currency: state.curr.label}
}

export default connect(mapStateToProps)(withRouter(Productdescription))