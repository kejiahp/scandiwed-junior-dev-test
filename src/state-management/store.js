import { createStore, combineReducers } from 'redux'
import { categorySlicer } from "./reducers/category-slicer";
import { currencySlicer } from './reducers/currency-slicer';

export const store = createStore(combineReducers({
    categ: categorySlicer,
    curr: currencySlicer
}))