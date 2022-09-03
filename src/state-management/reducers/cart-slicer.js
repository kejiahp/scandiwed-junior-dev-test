const initialState = {
    cartItems: [],
    cartItemNumber: 0,
    cartTotalPrice: 0
}

export const cartSlicer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD-PLP':
            return {}

        case 'ADD-PDP':
            return {}
        
        case 'REMOVE':
            return {}

        case 'ADD-MORE':
            return {}

        case 'REMOVE-SOME':
            return {}
    }
}