import React,{useState} from "react";
import {  MDBInput, MDBBtn,MDBAlert } from 'mdbreact';
import {connect} from 'react-redux'
import {LoginUser,errormessageclear,IniLoginRegister,countCart} from './../redux/actions'
import {Redirect} from 'react-router-dom' 

const Login = (props) => {

    const [data,setdata]=useState({
        username:'',
        password:''
    })

    // useEffect(() => {
    
    // }, [props]);


    const dataOnChange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const onFormSubmit=(e)=>{
        e.preventDefault()
        props.LoginUser(data)
    }
    if(props.User.islogin){
        return <Redirect to='/'/>
    }
    
    if(props.Header.ishalamanloginorregister===false){
    props.IniLoginRegister()
    
    }

    return (
        <div>
            {/* UNTUK LOGIN */}
            <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
                <form style={{width:'30%'}} onSubmit={onFormSubmit}>
                    <p className="h3 text-center mb-4">Sign in</p>
                    <div className="grey-text">
                        <MDBInput 
                            label="Type your Username" 
                            name='username' 
                            onChange={dataOnChange} 
                            icon="user" 
                            group 
                            type="text" 
                            validate 
                            error='dsadas'
                            value={data.username}
                        />
                        <MDBInput value={data.password} label="Type your password" name='password' onChange={dataOnChange} icon="lock" group type="password" validate />
                   
                    </div>
                    {
                        props.User.errormes?
                        <MDBAlert color="danger" >
                            {props.User.errormes} <span className='float-right hovererr font-weight-bold' onClick={()=>props.errormessageclear()}>X</span>
                        </MDBAlert>
                        :
                        null
                    }

                    <div className="text-center">
                        <MDBBtn type='submit' color='deep-orange' disabled={props.User.loading}>Login</MDBBtn>
                    </div>
                    <div>
                        <br/>
                        <p className='text-center '>belum punya akun? register dulu
                        <a href='/register' className='font-weight-bold'> di sini</a>
                         </p>
                        <span></span>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

const MapstatetoProps=(state)=>{
    return {
        User:state.Auth,
        Header:state.Header
    }
}

export default connect(MapstatetoProps,{LoginUser,errormessageclear,IniLoginRegister,countCart}) (Login);