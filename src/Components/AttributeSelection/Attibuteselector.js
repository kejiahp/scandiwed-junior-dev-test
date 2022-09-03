import React, { Component } from 'react'
import './Attributeselector.css'
import { connect } from 'react-redux'

class Attibuteselector extends Component {
  state = {
    data: null
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
    getProductAttr().then(res => this.setState({data: res.data.product}))

  }

  render() {
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

      })}
      else{
        selections = ''
      }
    }
    console.log(selections)

    return (
    <div className='attribute-backdrop' onClick={this.props.clicked}>
        <div className='attribute-selector'>
          <p className='attr-sele-title'>Please select product attributes</p>
          <div>
            {selections === '' ? <h1>This product as no attributes</h1>: selections}
          </div>
          <div className='attr-sele-btns'>
            <button className='attr-sele-cncl'>Cancel</button>
            <button className='attr-sele-add'>Add to cart and continue shopping</button>
          </div>
        </div>
    </div>
        
    )
  }
}

const mapStateToProps = (state) => {
  return {category_name: state.categ.category, currency: state.curr.label, productId: state.categ.productId }
}

export default connect(mapStateToProps)(Attibuteselector)