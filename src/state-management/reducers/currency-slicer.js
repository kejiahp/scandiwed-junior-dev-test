import { usd, aud, gbp, rub, jpy } from "../actions/currency-actions";

const initialState = { label:"USD", symbol: '$' }

export const currencySlicer = (state=initialState, action) => {
    switch(action.type) {
        case usd:
            return {
                ...state, label:"USD", symbol: '$'
            }
        case aud:
            return {
                ...state, label: "AUD", symbol: 'A$'
            }
        case gbp:
            return {
                ...state, label: "GBP", symbol: '£'
            }
        case rub:
            return {
                ...state, label: "RUB", symbol: '₽'
            }
        case jpy:
            return {
                ...state, label: "JPY", symbol: '¥'
            }
        default:
            return state
    }
}