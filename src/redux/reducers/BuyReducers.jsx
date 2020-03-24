import {
    COUNT_CART
} from '../actions/type'


const INITIAL_STATE={
    cart:0
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case COUNT_CART :
            return{...state,cart:+action.payload}
        default :
            return state
    }
}