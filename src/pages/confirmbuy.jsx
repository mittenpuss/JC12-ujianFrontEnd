import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {IniLoginRegister} from './../redux/actions'

class ConfirmBuy extends Component {
    state = {  }

    render() {
        if(this.props.Header.ishalamanloginorregister===false){
            this.props.IniLoginRegister()
        }    

        if(this.props.User.role==='admin'){
            return ( 
                <div>
                </div>
             );
        }else{
            return <Redirect to='/notfound'/>
        }
    }


}

const MapstatetoProps=(state)=>{
    return{
        User:state.Auth,
        Header:state.Header
    }
}

export default connect(MapstatetoProps,{IniLoginRegister})(ConfirmBuy);