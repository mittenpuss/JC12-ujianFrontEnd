import {USER_LOGIN_LOGOUT_PAGE,NOT_USER_LOGIN_LOGOUT_PAGE} from '../actions/type'

const INITIAL_STATE={
    ishome:false,
    ishalamanloginorregister:false,
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'BUKANHOME': 
            return {...state,ishome:false}
        case 'INIHOME':
            return {...state,ishome:true}
        case USER_LOGIN_LOGOUT_PAGE:
            return{...state,ishalamanloginorregister:true}
        case NOT_USER_LOGIN_LOGOUT_PAGE:
            return{...state,ishalamanloginorregister:false}
        default:
            return state
    }
}