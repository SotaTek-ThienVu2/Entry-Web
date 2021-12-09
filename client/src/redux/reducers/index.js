import {combineReducers} from 'redux'
import productReducer from './ProductReducer'
const  rootReducer  = combineReducers({
    ListProduct:productReducer
});
export default rootReducer
