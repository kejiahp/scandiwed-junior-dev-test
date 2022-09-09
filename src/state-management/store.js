import { createStore, combineReducers } from 'redux'
import { categorySlicer } from "./reducers/category-slicer";
import { currencySlicer } from './reducers/currency-slicer';
import { cartSlicer } from './reducers/cart-slicer';

export const store = createStore(combineReducers({
    categ: categorySlicer,
    curr: currencySlicer,
    cart: cartSlicer
}))