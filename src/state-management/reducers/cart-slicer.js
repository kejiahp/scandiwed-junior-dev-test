const initialState = {
    cartItems: [],
    cartItemNumber: 0,
    cartTotalPrice: 0
}

export const cartSlicer = (state = initialState, action) => {
        if (action.type === 'ADD'){
            let newstate = { ...state }
            let topItem = null

            //If cart is empty check add first item
            if(newstate.cartItems.length === 0) {
                let totprice = action.payload.price
                newstate.cartItems.push({...action.payload, totalPrice:totprice})
                newstate.cartTotalPrice += totprice
                newstate.cartItemNumber += 1
                return { ...newstate }
            }
            newstate.cartItems.forEach(item => {
                //ITEM STACKING CONTROLLER
                //if the items have the same id check if the have the same attributes, if attributes are the same stack them, if not add it as a new item i the cart
                //I used numbers to count the number of attributes of the item with similar id, then subtract one from the numbers for each similarity of attributes
                //so if stack attributes number is zero and text attributes number is zero the are completly the same so stack them
                if(item.id === action.payload.id){
                    let textCount = item.attributes.text.length


                    item.attributes.text.forEach(stateitem => {
                        let item1Value =  Object.values(stateitem)[0]
                        let item1Key = Object.keys(stateitem)[0]

                        action.payload.attributes.text.forEach(item => {
                            let item2Value = Object.values(item)[0]
                            let item2Key = Object.keys(item)[0]

                            if(item1Value === item2Value && item1Key===item2Key) {
                                textCount--
                            }
                        })
                    })



                    let swatchCount = item.attributes.swatch.length

                    item.attributes.swatch.forEach(stateitem => {
                        let item1Value =  Object.values(stateitem)[0]
                        let item1Key = Object.keys(stateitem)[0]

                        action.payload.attributes.swatch.forEach(itemx => {
                            let item2Value = Object.values(itemx)[0]
                            let item2Key = Object.keys(itemx)[0]

                            if(item1Value === item2Value && item1Key===item2Key) {
                                swatchCount--
                            }
                        })
                    })
                    
                    if(textCount === 0 && swatchCount === 0) {
                        topItem = item
                    }
                    
                }
            })

            if(topItem){
                topItem.quantity++
                topItem.totalPrice += action.payload.price
                newstate.cartItemNumber += 1
                newstate.cartTotalPrice += action.payload.price
            }
            else{
                newstate.cartItems.push({...action.payload, totalPrice: action.payload.price})
                newstate.cartTotalPrice += action.payload.price
                newstate.cartItemNumber += 1
            }
            return { ...newstate }
        }

        else if(action.type === 'REMOVE') {
            return {}
        }

        else if(action.type === 'ADD-MORE'){
            const newstate = {...state}
            let topItem = null

            //Check through product attributes
            newstate.cartItems.forEach(item => {
                if(item.id === action.payload.id){
                    let textCount = item.attributes.text.length


                    item.attributes.text.forEach(stateitem => {
                        let item1Value =  Object.values(stateitem)[0]
                        let item1Key = Object.keys(stateitem)[0]

                        action.payload.attributes.text.forEach(item => {
                            let item2Value = Object.values(item)[0]
                            let item2Key = Object.keys(item)[0]

                            if(item1Value === item2Value && item1Key===item2Key) {
                                textCount--
                            }
                        })
                    })



                    let swatchCount = item.attributes.swatch.length

                    item.attributes.swatch.forEach(stateitem => {
                        let item1Value =  Object.values(stateitem)[0]
                        let item1Key = Object.keys(stateitem)[0]

                        action.payload.attributes.swatch.forEach(itemx => {
                            let item2Value = Object.values(itemx)[0]
                            let item2Key = Object.keys(itemx)[0]

                            if(item1Value === item2Value && item1Key===item2Key) {
                                swatchCount--
                            }
                        })
                    })
                    
                    if(textCount === 0 && swatchCount === 0) {
                        topItem = item
                    }
                    
                }
            })

            if(topItem){
                    topItem.quantity++
                    topItem.totalPrice += action.payload.price
                    newstate.cartItemNumber += 1
                    newstate.cartTotalPrice += action.payload.price
            }


            return {...newstate}
        }

        else if(action.type === 'REMOVE-SOME'){
            const newstate = {...state}
            let topItem = null

            //Check through product attributes
            newstate.cartItems.forEach(item => {
                if(item.id === action.payload.id){
                    let textCount = item.attributes.text.length


                    item.attributes.text.forEach(stateitem => {
                        let item1Value =  Object.values(stateitem)[0]
                        let item1Key = Object.keys(stateitem)[0]

                        action.payload.attributes.text.forEach(item => {
                            let item2Value = Object.values(item)[0]
                            let item2Key = Object.keys(item)[0]

                            if(item1Value === item2Value && item1Key===item2Key) {
                                textCount--
                            }
                        })
                    })



                    let swatchCount = item.attributes.swatch.length

                    item.attributes.swatch.forEach(stateitem => {
                        let item1Value =  Object.values(stateitem)[0]
                        let item1Key = Object.keys(stateitem)[0]

                        action.payload.attributes.swatch.forEach(itemx => {
                            let item2Value = Object.values(itemx)[0]
                            let item2Key = Object.keys(itemx)[0]

                            if(item1Value === item2Value && item1Key===item2Key) {
                                swatchCount--
                            }
                        })
                    })
                    
                    if(textCount === 0 && swatchCount === 0) {
                        topItem = item
                    }
                    
                }
            })

            if(topItem){
                if(topItem.quantity !== 1) {
                    topItem.quantity--
                    topItem.totalPrice -= action.payload.price
                    newstate.cartItemNumber -= 1
                    newstate.cartTotalPrice -= topItem.price
                }
                else{
                    let itemIndex = null
                    let topItemPrice = null
                    newstate.cartItems.forEach((item,index) => {
                        if(item.id === topItem.id){
                            let textCount = item.attributes.text.length
        
        
                            item.attributes.text.forEach(stateitem => {
                                let item1Value =  Object.values(stateitem)[0]
                                let item1Key = Object.keys(stateitem)[0]
        
                                action.payload.attributes.text.forEach(item => {
                                    let item2Value = Object.values(item)[0]
                                    let item2Key = Object.keys(item)[0]
        
                                    if(item1Value === item2Value && item1Key===item2Key) {
                                        textCount--
                                    }
                                })
                            })
        
        
        
                            let swatchCount = item.attributes.swatch.length
        
                            item.attributes.swatch.forEach(stateitem => {
                                let item1Value =  Object.values(stateitem)[0]
                                let item1Key = Object.keys(stateitem)[0]
        
                                action.payload.attributes.swatch.forEach(itemx => {
                                    let item2Value = Object.values(itemx)[0]
                                    let item2Key = Object.keys(itemx)[0]
        
                                    if(item1Value === item2Value && item1Key===item2Key) {
                                        swatchCount--
                                    }
                                })
                            })
                            
                            if(textCount === 0 && swatchCount === 0) {
                                itemIndex = index
                                topItemPrice = item.price
                            }
                            
                        }
                    })

                    if(itemIndex >= 0) {
                        newstate.cartItemNumber -= 1
                        newstate.cartItems.splice(itemIndex,1)
                        newstate.cartTotalPrice -= topItemPrice
                    }

                }

            }


            return {...newstate}
        }
        else{
            return state
        }

}