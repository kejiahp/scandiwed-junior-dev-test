import { all, tech, clothes, openSele, closeSele } from "../actions/actions"

const intialState = {
    category: "all",
    attributeSelector: false,
    productId: null
}

export const categorySlicer = (state=intialState, action) => {
    switch(action.type){
        case all:
            return{...state,
                category:"all"}

        case tech:
            return {...state,
                category:"tech"
            }
        case clothes:
            return{
                ...state,
                category:"clothes"
            }
        case openSele:
            return {
                ...state,
                attributeSelector: true,
                productId: action.payload
            }
        case closeSele:
            return {
                ...state,
                attributeSelector: false,
                productId: null
            }
        default:
            return state
    }
}