

import React,{useState} from "react";
import {  MDBInput, MDBBtn,MDBAlert } from 'mdbreact';
import {connect} from 'react-redux'
import {errormessageclear,changepasswordclear,IniLoginRegister,ChangePassword} from '../redux/actions'
import {Redirect} from 'react-router-dom' 

const Profile = (props) => {

    const [data,setdata]=useState({
        currentpasswordinput:'',
        newpassword:'',
        newpasswordconf:'',
        currentpassword:props.User.password,
        id:props.User.id,
        username:props.User.username
    })

    const dataOnChange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
        console.log(data)
    }
    const onFormSubmit=(e)=>{
        e.preventDefault()
        props.ChangePassword(data)
    }

    if(props.islogin==='false'){
        return <Redirect to='/'/>
    }

    if(props.Header.ishalamanloginorregister===false){
        props.IniLoginRegister()
        }
    
    // if(props.User.role !=='admin' && props.User.role !=='user'){
    //     return <Redirect to='/notfound'/>
    // }

    return (
        <div>
            {/* UNTUK GANTI PASSWORD */}
            <div className='d-flex justify-content-center align-items-center' style={{height:'80vh'}}>
                <form style={{width:'30%'}} onSubmit={onFormSubmit}>
                    <p className="h3 text-center mb-4">Change Password</p>
                    <div className="grey-text">
                        <MDBInput value={data.currentpasswordinput} label="Type your current password" name='currentpasswordinput' onChange={dataOnChange} icon="lock" group type="password" validate />
                        <MDBInput value={data.newpassword} label="Type your new password" name='newpassword' onChange={dataOnChange} icon="lock" group type="password" validate />
                        <MDBInput value={data.newpasswordconf} label="Confirm your new password" name='newpasswordconf' onChange={dataOnChange} icon="key" group type="password" validate />
                   
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
                        props.User.changepasssuccess?
                        <MDBAlert color="success" >
                            {props.User.changepasssuccess} <span className='float-right hovererr font-weight-bold' onClick={()=>props.changepasswordclear()}>X</span>
                        </MDBAlert>
                        :
                        null
                    }


                    <div className="text-center">
                        <MDBBtn type='submit' color='deep-orange' disabled={props.loading}>Change Password</MDBBtn>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

const MapstatetoProps=(state)=>{
    return{
        User:state.Auth,
        Header:state.Header
    }
}

export default connect(MapstatetoProps,{errormessageclear,changepasswordclear,IniLoginRegister,ChangePassword}) (Profile);