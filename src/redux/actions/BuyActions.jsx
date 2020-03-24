import Axios from 'axios'
import {API_URL} from '../../supports/ApiUrl'
import {COUNT_CART} from './type'

export const countCart=()=>{
    return (dispatch)=>{
        let id = localStorage.getItem('iduser')
        Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${id}&status=oncart`)
        .then((res)=>{   
            var newarr=[]
            res.data[0].transactiondetails.forEach(val =>{
                newarr.push(Axios.get(`${API_URL}/products/${val.productId}`))
            })
            Axios.all(newarr)
            .then((res2)=>{
                console.log(res2)
                res2.forEach((val, index)=>{
                    res.data[0].transactiondetails[index].dataprod=val.data 
                })
                let total=0
                res.data[0].transactiondetails.forEach((val)=>{
                    total+=val.qty
                })
                dispatch({type:COUNT_CART,payload:total})
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
  }
