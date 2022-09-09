import React, { Component } from 'react'
import './Attributeselector.css'
import { connect } from 'react-redux'
import { addToCart } from '../../state-management/actions/cart-actions'
import { closeSelector } from '../../state-management/actions/actions'

class Attibuteselector extends Component {
  state = {
    data: null,
    symbol:null,
    price:null,
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
    }
    else{
      copyAttr.attributes.swatch.push(attr)
      this.setState({attribute: copyAttr})
    }
  }

  clearSelectedHandler = () => {
    const stateAttr = {...this.state.attribute}
    const attr = stateAttr.attributes
    attr.text = []
    attr.swatch = []
    this.setState({attribute: stateAttr})
  }

  closeAttrSelector = () => {
    this.clearSelectedHandler()
    this.props.closeSelector()
  }

  addItemToCart = () => {
    let item = {...this.state.attribute}
    this.props.addToCart(item)
    this.props.closeSelector()
  }


  componentDidMount() {
    const getProductAttr = async () => {
      let result = await fetch('http://localhost:4000/', {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          query: `{
            product(id: "${this.props.productId.id}") {
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

      let data = result.json()
      return data

    }

    getProductAttr().then(res => {
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
      this.setState({data: res.data.product, attribute: attributeCopy, symbol:price_det.symbol, price:price_det.amount})
    })

  }

  render() {
    let counter = 0
    let selections = ''
    if(this.state.data){

       if(this.state.data.attributes.length !== 0){
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
                            return <div key={attr.id} className='product-desc-xs' onClick={() => this.setTextAttrHandler(attribute)}>
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
                                backgroundColor: `${attr.value}`
                            }
                            return <div key={attr.id} style={color} onClick={() => this.setSwatchAttrHandler(attribute)} className='product-desc-color-box'></div>
                        }
                        )}
                    </div>
                </div>
            )
        }
        return x

      })}
      else{
        selections = ''
      }

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

    let chosenText = []
    if(this.state.attribute.attributes.text.length > 0) {
      chosenText.push(
          this.state.attribute.attributes.text.map((item,index) => (
          <p key={index}>{Object.keys(item)[0]} : {Object.values(item)[0]}</p>
        ))
      )
    }
    if(this.state.attribute.attributes.swatch.length > 0) {
        chosenText.push(
          this.state.attribute.attributes.swatch.map((item,index) => {
            let span = {
              backgroundColor:`${Object.values(item)[0]}`,
              width: '15px',
              height: '15px',
              display: 'inline-block',
              marginLeft: '5px'
            }
          return <div key={index} style={{display: 'flex', alignItems:'center'}}>
                    <p>{Object.keys(item)[0]} : </p>
                    <div style={span}></div>
                </div>

          })
      )
    }


    console.log('[CART]',this.props.cart)


    return (
        <>
        <div className='attribute-backdrop' onClick={this.props.clicked}></div>
            <div className='attribute-selector'>
                <p className='attr-sele-title'>Please select product attributes</p>
                <p className='attr-sele-pricing'>{this.state.symbol} {Number(this.state.price).toLocaleString( {style: 'currency', minimumFractionDigits: 2})}</p>
                <div>
                  {selections === '' ? <h1>This product as no attributes</h1>: selections}
                </div>

                  <div>
                    {
                      chosenText.length > 0 ? <div>{chosenText} <p onClick={this.clearSelectedHandler} className='attr-sele-clear'>CLEAR SELECTED</p></div> : '' 
                    }
                  </div>

                <div className='attr-sele-btns'>
                  <button className='attr-sele-cncl' onClick={this.closeAttrSelector }>Cancel</button>
                  {counter === 0 && <button className='attr-sele-add' onClick={this.addItemToCart}>Add to cart and continue shopping</button>}
                </div>
            </div>
        </>

    )
  }
}

const mapDispatchToProps = () => {
  return {addToCart, closeSelector}
}

const mapStateToProps = (state) => {
  return {category_name: state.categ.category, currency: state.curr.label, productId: state.categ.productId, cart: state.cart }
}

export default connect(mapStateToProps,mapDispatchToProps())(Attibuteselector)