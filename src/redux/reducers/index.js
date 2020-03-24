import {combineReducers} from 'redux'
import AuthReducers from './AuthReducers'
import HeaderReducers from './Headerreducers'
import BuyReducers from './BuyReducers'

export default combineReducers({
    Auth:AuthReducers,
    Header:HeaderReducers,
    Total:BuyReducers
})