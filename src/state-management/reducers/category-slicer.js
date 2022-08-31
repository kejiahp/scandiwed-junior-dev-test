import { all, tech, clothes } from "../actions/actions"

const intialState = {
    category: "all"
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
        default:
            return state
    }
}