import React, { Component } from 'react'
import './Productdescription.css'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { addToCart } from '../../state-management/actions/cart-actions'
import { closeSelector } from '../../state-management/actions/actions'


class Productdescription extends Component {
    state = {
        bigImage: null,
        data: null,
        attribute: {
            id: null,
            name: null,
            brand: null,
            symbol: null,
            gallery: null,
            attributes: {
              text: [],
              swatch: []
            },
            price: null,
            quantity: 1
          }
    }

    changeImage = () => {
        if(!this.state.bigImage){
            this.setState({bigImage: this.state.data.gallery[0]})
        }
    }

    setTextAttrHandler = (attr) => {
        const copyAttr = {...this.state.attribute}
        //Check if the attribute.text property is empty or not
        if(copyAttr.attributes.text.length >0 ){
          //for every all-rounder true go's to the if statement
          //for every all-rounder false go's to the else statement
          //for this every partial-true or false go's to the if statement 
            const result = copyAttr.attributes.text.every(item => {
              //if not empty check if a object of that key was already pushed to array
              let key = Object.keys(attr)[0]
              if(key in item){return false}
              else{return true}
            })
    
            if(result) {
              copyAttr.attributes.text.push(attr)
              this.setState({attribute: copyAttr})
            }
            else{
                const result2 = copyAttr.attributes.text.filter(item => Object.keys(item)[0] !== Object.keys(attr)[0])
                copyAttr.attributes.text = result2
                this.setState({attribute: copyAttr})
                copyAttr.attributes.text.push(attr)
                this.setState({attribute: copyAttr})
            }
        }
        else{
          copyAttr.attributes.text.push(attr)
          this.setState({attribute: copyAttr})
        }
    
      }
    
      setSwatchAttrHandler = (attr) => {
        const copyAttr = {...this.state.attribute}
        //Check if the attribute.swatch property is empty or not
        if(copyAttr.attributes.swatch.length >0 ){
            const result = copyAttr.attributes.swatch.every(item => {
              //if not empty check if a object of that key was already pushed to array
              let key = Object.keys(attr)[0]
              if(key in item){return false}
              else{return true}
            })
    
            if(result) {
              copyAttr.attributes.swatch.push(attr)
              this.setState({attribute: copyAttr})
            }
            else{
                const result2 = copyAttr.attributes.swatch.filter(item => Object.keys(item)[0] !== Object.keys(attr)[0])
                copyAttr.attributes.swatch = result2
                copyAttr.attributes.swatch.push(attr)
                this.setState({attribute: copyAttr})
            }
        }
        else{
          copyAttr.attributes.swatch.push(attr)
          this.setState({attribute: copyAttr})
        }
      }

      addItemToCart = () => {
        let item = {...this.state.attribute}
        this.props.addToCart(item)
        // item.attributes.text = []
        // item.attributes.swatch = []
        // this.setState({attribute: item})
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
                      }
                      `
                })
            })
    
            let data = await result.json()
            return data
        }
        getProductInfo().then(res => {
            const price_det = {}
            res.data.product.prices.forEach(price => {
               if(price.currency.label === this.props.currency) {
                price_det["amount"] = price.amount
                price_det["symbol"] = price.currency.symbol
               }
            })
      
      
            const attributeCopy = {...this.state.attribute}
            attributeCopy.id = res.data.product.id
            attributeCopy.name = res.data.product.name
            attributeCopy.brand = res.data.product.brand
            attributeCopy.symbol = price_det.symbol
            attributeCopy.gallery = res.data.product.gallery
            attributeCopy.price = price_det.amount

            this.setState({data: res.data.product, bigImage: res.data.product.gallery[0], attribute: attributeCopy})
        })
        
    
    }


  render() {

    //Function to give selected Text attribute a background color
    const selectedTextColorHandler = (attr) => {
        let selectedStyle = {}
        const copyAttr = {...this.state.attribute}
        if(copyAttr.attributes.text.length >0 ){
            // const result = copyAttr.attributes.text.every(item => {
            //   let key = Object.keys(attr)[0]
            //   let value = Object.values(attr)[0]
            //   //if the attribute name and attribute values are the same give it a background color
            //   if(key === Object.keys(item)[0] && value === Object.values(item)[0] ){return true}
            //   else{return false}
            // })
            let result = false
            copyAttr.attributes.text.forEach(item => {
              let key = Object.keys(attr)[0]
              let value = Object.values(attr)[0]
              //if the attribute name and attribute values are the same give it a background color
              if(key === Object.keys(item)[0] && value === Object.values(item)[0] ){result = true}
              else{result = false}
            })
    
            if(result) {
                selectedStyle = {
                    backgroundColor: 'black',
                    color: 'white'
                }
            }
        }

        return selectedStyle
      }

          //Function to give selected swatch attribute a background color
    const selectedSwatchColorHandler = (attr) => {
        let selectedStyle = {}
        const copyAttr = {...this.state.attribute}
        if(copyAttr.attributes.swatch.length >0 ){
            const result = copyAttr.attributes.swatch.every(item => {
              let key = Object.keys(attr)[0]
              let value = Object.values(attr)[0]
              //if the attribute name and attribute values are the same give it a background color
              if(key in item && value === Object.values(item)[0] ){return true}
              else{return false}
            })
    
            if(result) {
                selectedStyle = {
                    border: '1px solid #5ECE7B'
                }
            }
        }

        return selectedStyle
      }

      // console.log('[PRODUCT DESC]', this.state.attribute)

    const price_det = {}
    let selections = ''
    let smallImages
    let brand =''
    let name = ''
    let description = ''
    let counter = 0

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

                                let attribute ={}
                                attribute[item.name] = attr.value

                                let styling = selectedTextColorHandler(attribute)


                                return <div key={attr.id} style={styling} className='product-desc-xs' onClick={() => this.setTextAttrHandler(attribute)}>
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
                            let attribute ={}
                            attribute[item.name] = attr.value
                                const color ={
                                    backgroundColor: `${attr.value}`,
                                    height: '20px',
                                    margin: '1px'
                                }
                                let styling = selectedSwatchColorHandler(attribute)
                                
                                return (<div key={attr.id} style={styling} className='product-desc-color-box'>
                                        <div style={color} onClick={() => this.setSwatchAttrHandler(attribute)}></div>
                                    </div>)
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

           //To ensure an option is selected per attribute if an option is not select add to cart button is hidden
           if(this.state.data.attributes.length !== 0){
            let attr_type = this.state.data.attributes
            //counts the number of options
            counter = attr_type.length
    
            attr_type.forEach(atrrItem => {
                if(atrrItem.type === 'text') {
                  this.state.attribute.attributes.text.forEach(item => {
                    //checks if option is in this.state.attribute if so it as been selected
                    //then counter decreases by one, same logic for swatch until it becomes zero
                    //then add to cart button is shown
                    if(Object.keys(item)[0] === atrrItem.name) {
                      counter--
                    }
                  })
                }
    
                if(atrrItem.type === 'swatch') {
                  this.state.attribute.attributes.swatch.forEach(item => {
                    if(Object.keys(item)[0] === atrrItem.name ) {
                      counter--
                    }
                  })
                }
            })
    
          }


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

                        {counter===0 ? <button className='prdt-desc-props-tocart-btn' onClick={this.addItemToCart}>Add to cart</button> : <button className='prdt-desc-props-tocart-btn add-to-cart-disabled' disabled onClick={()=> alert('SELECT ATTRIBUTES')}>Add to cart</button>}

                        <div className='prdt-desc-props-desc'>
                            <p dangerouslySetInnerHTML={{__html: `${description}`}}/>
                        </div>
                    </div>

                </div>
            </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {category_name: state.categ.category, currency: state.curr.label, cart: state.cart.cartItems}
}

const mapDispatchToProps = () => {
    return {addToCart,closeSelector}
  }

export default connect(mapStateToProps , mapDispatchToProps())(withRouter(Productdescription))