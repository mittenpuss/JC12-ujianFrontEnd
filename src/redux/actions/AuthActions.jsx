import Axios from 'axios'
import { 
    USER_LOGIN_START,
    USER_LOGIN_FAILED, 
    USER_LOGIN_SUCCESS, 
    USER_REGISTER_START,
    USER_REGISTER_FAILED, 
    USER_REGISTER_SUCCESS, 
    USER_CHANGE_PASSWORD_START,
    USER_CHANGE_PASSWORD_FAILED,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_LOGOUT, 
    USER_SEARCH
} from './type'
import { API_URL } from '../../supports/ApiUrl'


export const LoginUser=({username,password})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
        if(username===''||password===''){//kalo ada input yang kosong
            dispatch({type:USER_LOGIN_FAILED,payload:'username atau password tidak terisi'})
        }else{
            Axios.get(`${API_URL}/users`,{
                params:{
                    username:username,
                    password:password,
                }
            })
            .then((res)=>{
                if(res.data.length){//user ada
                    localStorage.setItem('iduser',res.data[0].id)
                    localStorage.setItem('role',res.data[0].role)
                    dispatch({type:USER_LOGIN_SUCCESS,payload:res.data})
                }else{
                    dispatch({type: USER_LOGIN_FAILED,payload:'username atau password tidak terdaftar'})
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:USER_LOGIN_FAILED,payload:err.message})
            })
        }
    }
}

export const RegisterUser=({username,password,passwordconf})=>{
    return (dispatch)=>{
        dispatch({type:USER_REGISTER_START})
        if(username===''||password===''||passwordconf===''){//kalo ada input yang kosong
            dispatch({type:USER_REGISTER_FAILED,payload:'username atau password tidak terisi'})
        }else{
            Axios.get(`${API_URL}/users?username=${username}`)
            .then((res1)=>{
                if(res1.data.length){//user ada
                    dispatch({type:USER_REGISTER_FAILED,payload:'username sudah terdaftar, mohon gunakan username yang lain'})
                }else{
                    if(password === passwordconf){
                        Axios.post(`${API_URL}/users`,{username,password,role:'user'})
                        .then((res2)=>{
                            dispatch({type:USER_REGISTER_SUCCESS,payload:'registrasi berhasil,silahkan login'})
                        }).catch((err2)=>{
                            console.log(err2)
                        })
                    }else{
                        dispatch({type:USER_REGISTER_FAILED,payload:'konfirmasi password harus sesuai'})
                    }
                }
            }).catch((err1)=>{
                console.log(err1)
                dispatch({type:USER_REGISTER_FAILED,payload:err1.message})
            })
        }
    }
}

export const ChangePassword=(data)=>{
    return (dispatch)=>{
        dispatch({type:USER_CHANGE_PASSWORD_START})
        if(data.currentpasswordinput === '' || data.newpassword === '' || data.newpasswordconf === ''){//kalo ada input yang kosong
            dispatch({type:USER_CHANGE_PASSWORD_FAILED,payload:'lengkapi form yang ada'})
        }else if (data.newpassword===data.currentpassword){
            dispatch({type:USER_CHANGE_PASSWORD_FAILED,payload:'password anda sama, tidak berubah'})
        }else if (data.newpassword !== data.newpasswordconf){
            dispatch({type:USER_CHANGE_PASSWORD_FAILED,payload:'konfirmasi password tidak sesuai'})
        }else if(data.currentpasswordinput !== data.currentpassword){
            dispatch({type:USER_CHANGE_PASSWORD_FAILED,payload:'password yang anda ketikkan salah'})
        }else{
            let role = localStorage.getItem('role')
            Axios.put(`${API_URL}/users/${data.id}`,{username:data.username,password:data.newpassword,role:role})
            .then((res)=>{
                var usernewdata ={
                    message:'password berhasil diganti',
                    password:data.newpassword,
                    username:data.username,
                    role:role
                }
                dispatch({type:USER_CHANGE_PASSWORD_SUCCESS,payload:usernewdata})
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}

export const searchItem=({searchInput})=>{
    return (dispatch)=>{
        dispatch({type:USER_SEARCH,payload:searchInput})
        localStorage.setItem('search',searchInput)
    }
}


  //Clear Message
export const errormessageclear=()=>{
    return{
        type:'ErrorClear'
    }
}

export const regsuccessclear=()=>{
    return{
        type:'SuccessClear'
    }
}

export const changepasswordclear=()=>{
    return{
        type:'PasswordChangeClear'
    }
}



//Header

export const KeepLogin=(data)=>{
    return{
        type:USER_LOGIN_SUCCESS,
        payload:data
    }
}

export const Logout=()=>{
    return{
        type:USER_LOGOUT,
    }
}

