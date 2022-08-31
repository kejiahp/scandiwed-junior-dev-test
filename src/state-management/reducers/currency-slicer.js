import { usd, aud, gbp, rub, jpy } from "../actions/currency-actions";

const initialState = { label:"USD" }

export const currencySlicer = (state=initialState, action) => {
    switch(action.type) {
        case usd:
            return {
                ...state, label:"USD"
            }
        case aud:
            return {
                ...state, label: "AUD"
            }
        case gbp:
            return {
                ...state, label: "GBP"
            }
        case rub:
            return {
                ...state, label: "RUB"
            }
        case jpy:
            return {
                ...state, label: "JPY"
            }
        default:
            return state
    }
}