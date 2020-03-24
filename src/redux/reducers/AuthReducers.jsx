import {
    USER_LOGIN_FAILED,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAILED,
    USER_REGISTER_START,
    USER_REGISTER_SUCCESS,
    USER_CHANGE_PASSWORD_FAILED,
    USER_CHANGE_PASSWORD_START,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_SEARCH
} from '../actions/type'


const INITIAL_STATE={
    searchName:'',
    username:'',
    password:'',
    id:'',
    loading:false,
    islogin:false,
    errormes:'',
    regsuccess:'',
    changepasssuccess:'',
    role:''
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case USER_LOGIN_START:
            return {...state,loading:true}
        case USER_LOGIN_SUCCESS:
            return {...state,loading:false,...action.payload,islogin:true}
        case USER_LOGIN_FAILED:
            return{...state,loading:false,errormes:action.payload}
        case USER_LOGOUT:
            return{...state,loading:false,islogin:false}
        case USER_REGISTER_START:
            return {...state,loading:true}
        case USER_REGISTER_SUCCESS:
            return {...state,loading:false,...action.payload,regsuccess:action.payload}
        case USER_REGISTER_FAILED:
            return{...state,loading:false,errormes:action.payload}
        case USER_CHANGE_PASSWORD_START:
            return {...state,loading:true}
        case USER_CHANGE_PASSWORD_SUCCESS:
            return {...state,loading:false,password:action.payload.password,changepasssuccess:action.payload.message}
        case USER_CHANGE_PASSWORD_FAILED:
            return{...state,loading:false,errormes:action.payload}
        case USER_SEARCH: 
            return{...state,searchName:action.payload.searchName}
        case 'ErrorClear':
            return INITIAL_STATE
        case 'SuccessClear':
            return INITIAL_STATE
        case 'PasswordChangeClear':
            return INITIAL_STATE
        default:
            return state
    }
}



