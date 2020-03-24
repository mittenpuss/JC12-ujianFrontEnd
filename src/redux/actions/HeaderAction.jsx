import { USER_LOGIN_LOGOUT_PAGE,NOT_USER_LOGIN_LOGOUT_PAGE } from "./type"

export const IniHome=()=>{
    console.log('inihome')
    return{
        type:'INIHOME'
    }
}
export const BukanHome=()=>{
    return{
        type:'BUKANHOME'
    }
}

export const IniLoginRegister=()=>{
    return{
        type:USER_LOGIN_LOGOUT_PAGE
    }
}


export const IniBukanLoginRegister=()=>{
    return{
        type:NOT_USER_LOGIN_LOGOUT_PAGE
    }
}
