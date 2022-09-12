import { legacy_createStore,combineReducers } from 'redux'
import { categorySlicer } from "./reducers/category-slicer";
import { currencySlicer } from './reducers/currency-slicer';
import { cartSlicer } from './reducers/cart-slicer';

export const store = legacy_createStore(combineReducers({
    categ: categorySlicer,
    curr: currencySlicer,
    cart: cartSlicer
})
,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)