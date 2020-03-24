import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { API_URL } from '../supports/ApiUrl';
import {changetoRupiah} from './../supports/changeToRp'
import {connect} from 'react-redux'
import {countCart} from '../redux/actions'
import {Modal,ModalBody,ModalFooter} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const ProductDetail =(props)=>{

    const [data,setdata]=useState({})
    const [qty,setqty]=useState(1)
    const [modalopen,setmodalopen]=useState(false)
    const [redirectlog,setredirectlog]=useState(false)

    useEffect(()=>{//sama dengan didmount
        Axios.get(`${API_URL}/products/${props.match.params.idprod}`)
        .then((res)=>{
            console.log(res.data)
            setdata(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[props.match.params.idprod])
    
    const qtychange=(e)=>{
        if(e.target.value===''){
            setqty(0)
        }
        if(Number(e.target.value)){
            if(qty===0){
                setqty(e.target.value[1])
            }else{
                if(e.target.value>stok){//jika valuenya lebih besar maka qtynya akan maksimal
                    setqty(stok)
                }else if(e.target.value<1){
                    setqty(1)
                }
                else{
                    // console.log(e.target.defaultValue)
                    setqty(e.target.value)
                }
            }
        }
    }

const sendtoCart=()=>{
        if(props.User.islogin&&props.User.role==='user'){
            var objecttransaction={
                status:'oncart',
                userId:props.User.id
            }
            console.log(props.User.id)
            Axios.get(`${API_URL}/transactions?status=oncart&userId=${props.User.id}`)
            .then((res1)=>{
                if(res1.data.length){
                    var objectdetails={
                        transactionId:res1.data[0].id,
                        productId:data.id,
                        qty:qty
                    }
                    // harusnya disini get data dulu, kalo ada di looping buat cek kalau ga ada baru di post
                    Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${props.User.id}&status=oncart`)
                    .then((res4)=>{
                        var add=false
                        console.log(res4.data[0].transactiondetails)
                        // eslint-disable-next-line array-callback-return
                        res4.data[0].transactiondetails.map((val)=>{
                            console.log(val.productId)
                            if(val.productId===data.id){
                                console.log('harusnya masuk sini dulu')
                                Axios.patch(`${API_URL}/transactiondetails/${val.id}`, {qty:val.qty+qty})
                                add=true
                                console.log(add)
                                    MySwal.fire({
                                        icon:'success',
                                        title:'Berhasil Masuk Cart'
                                    }).then((res)=>{
                                        props.countCart(props.User.id)
                                    })
                                }
                            })

                            if(add===false){
                                Axios.post(`${API_URL}/transactiondetails`,objectdetails) //masukin data belanjaan
                                .then((res3)=>{
                                    console.log(res3.data)
                                    MySwal.fire({
                                        icon:'success',
                                        title:'Berhasil Masuk Cart'
                                    }).then((res)=>{
                                        props.countCart(props.User.id)
                                    })
                                })
                            }
                    })
                }else{
                    Axios.post(`${API_URL}/transactions`, objecttransaction) //masukin data user ke cart
                    .then((res2)=>{
                        var objectdetails={
                            transactionId:res2.data.id,
                            productId:data.id,
                            qty:qty
                        }
                        Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${props.User.id}&status=oncart`)
                        .then((res4)=>{
                            var add=false
                            // eslint-disable-next-line array-callback-return
                            res4.data[0].transactiondetails.map((val)=>{
                                if(val.productId===data.id){
                                    add=true
                                    Axios.patch(`${API_URL}/transactiondetails/${val.id}`, {qty:val.qty+qty})
                                    MySwal.fire({
                                        icon:'success',
                                        title:'Berhasil Masuk Cart'
                                    }).then((res)=>{
                                        props.countCart(props.User.id)
                                    })
                                }
                            })
                            if(add===false){
                                Axios.post(`${API_URL}/transactiondetails`,objectdetails) //masukin data belanjaan
                                .then((res3)=>{
                                    console.log(res3.data)
                                    MySwal.fire({
                                        icon:'success',
                                        title:'Berhasil Masuk Cart'
                                    }).then((res)=>{
                                        props.countCart(props.User.id)
                                    })
                                })
                            }
                        })
                    })
                }
            })
            // setid(this.props.User.id)
            
        }else{
            setmodalopen(true)
        }
    }    
    
    const onToLoginClick=()=>{
        if(props.User.role==='admin'){
            setmodalopen(false)
        }else{
            setmodalopen(false)
            setredirectlog(true)
        }

    }
    const {name,image,seen,stok,harga}=data
    if(redirectlog){
        return <Redirect to='/login'/>
    }

    
    if(data){
        return(
            <div className='paddingatas'>
                <Modal centered toggle={()=>setmodalopen(false)} isOpen={modalopen}>
                    <ModalBody>
                        {
                            props.User.role==='admin'?
                            'Maaf anda Admin, Admin tidak bisa berbelanja'
                            :
                            'Maaf Anda harus Login Dahulu'
                        }
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={onToLoginClick}>OK</button>
                    </ModalFooter>
                </Modal>
                <div className="row">
                    <div className="col-md-4 p-2">
                        <div className="product-detail">
                            <img src={image} alt={name} width='100%' className='rounded'/>
                        </div>
                    </div>
                    <div className="col-md-8 p-2">
                        <div className='border-headerdetail'>
                            <div className='font-weight-bolder font-nameprod'>
                                {name}
                            </div>
                            <div className='font-typographysmall'>
                                <span className='font-weight-bold'>{0}&nbsp;X</span> dibeli
                            </div>
                        </div>
                        <div className='' style={{lineHeight:'50px'}}>
                            <div className="row">
                                <div className="col-md-1 font-typographymed">
                                   Stok
                                </div>
                                <div className="col-md-11">
                                    {stok}pcs
                                </div>
                            </div>
                        </div>
                        <div style={{lineHeight:'80px'}}>
                            <div className="row" style={{verticalAlign:'center'}}>
                                <div className="col-md-1 font-typographymed" >
                                   Harga
                                </div>
                                <div className="col-md-11 font-harga">
                                    {changetoRupiah(harga*qty)}
                                </div>                               
                            </div>
                        </div>
                        <div style={{lineHeight:'30px'}}>
                            <div className="row" style={{verticalAlign:'center'}}>
                                <div className="col-md-1 font-typographymed" >
                                   Deskripsi
                                </div>
                                <div className="ml-5 mr-5">
                                    {data.deskripsi}
                                </div>                               
                            </div>
                        </div>
                        <div className=' border-headerdetail' >
                            <div className="row" >
                                <div className="col-md-1 font-typographymed py-3">
                                   Jumlah
                                </div>
                                <div className="col-md-11 d-flex py-2">
                                    <button className='btn btn-primary' disabled={qty<=1?true:false} onClick={()=>setqty(qty-1)}>-</button>
                                    <div className='rounded' style={{border:'1px black solid'}} >
                                        <input 
                                            type="text" 
                                            style={{width:'100px',height:'60px',textAlign:'center',backgroundColor:'transparent',border:'0px'}} 
                                            value={qty} 
                                            onChange={qtychange}
                                        />
                                    </div>
                                    <button className='btn btn-primary' disabled={qty>=stok?true:false} onClick={()=>setqty(parseInt(qty)+1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className=' border-headerdetail' style={{lineHeight:'80px'}}>
                            <button className='btn deep-orange text-light' onClick={sendtoCart}>Beli</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return <div className='paddingatas'>loadingg...</div>
}
const MapstatetoProps=(state)=>{
    return{
        User:state.Auth
    }
}

export default connect(MapstatetoProps,{countCart})(ProductDetail);