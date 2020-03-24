import React,{useState} from "react";
import {  MDBInput, MDBBtn,MDBAlert } from 'mdbreact';
import {connect} from 'react-redux'
import {RegisterUser,errormessageclear,regsuccessclear,IniLoginRegister} from './../redux/actions'
import {Redirect} from 'react-router-dom' 

const Register = (props) => {


    const [register,setregister]=useState({
        username:'',
        password:'',
        passwordconf:'',
        
    })
    
    const dataOnChange=(e)=>{
        setregister({...register,[e.target.name]:e.target.value})
    }
    const onFormSubmit=(e)=>{
        e.preventDefault()
        props.RegisterUser(register)
    }

    if(props.User.islogin){
        return <Redirect to='/'/>
    }
    
    if(props.Header.ishalamanloginorregister===false){
    props.IniLoginRegister()
    }

    return (

        <div>
            {/* UNTUK Register */}
            <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
                <form style={{width:'30%'}} onSubmit={onFormSubmit}>
                    <p className="h3 text-center mb-4">Register</p>
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
                            value={register.username}
                        />
                        <MDBInput value={register.password} label="Type your password" name='password' onChange={dataOnChange} icon="lock" group type="password" validate />
                        <MDBInput value={register.passwordconf} label="Confirm your password" name='passwordconf' onChange={dataOnChange} icon="lock" group type="password" validate />                   
                    </div>
                    {
                        props.User.errormes?
                        <MDBAlert color="danger" >
                            {props.User.errormes} <span className='float-right hovererr font-weight-bold' onClick={()=>props.errormessageclear()}>X</span>
                        </MDBAlert>
                        
                        :
                        null
                    }

                    {
                        props.User.regsuccess?
                        <MDBAlert color="success" >
                            {props.User.regsuccess} <span className='float-right hovererr font-weight-bold' onClick={()=>props.regsuccessclear()}>X</span>
                        </MDBAlert>
                        :
                        null
                    }

                    <div className="text-center">
                        <MDBBtn rounded color='deep-orange' type='submit' disabled={props.User.loading}>Register</MDBBtn>
                    </div>
                    <div>
                        <br/>
                        <p className='text-center '>sudah punya akun? login
                        <a href='/login' color='danger' className='font-weight-bold'> di sini</a>
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

export default connect(MapstatetoProps,{RegisterUser,errormessageclear,regsuccessclear,IniLoginRegister}) (Register);