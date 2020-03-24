import React,{Component} from 'react';
import Image from './image/404.png'
import {connect} from 'react-redux'
import {IniLoginRegister} from './../redux/actions'

class NotFound extends Component {
    state = {  }    
    render() { 
        
        if(this.props.Header.ishalamanloginorregister===false){
            this.props.IniLoginRegister()
        }

        return (
            <div>
                <div className='text-center mt-3'>
                    <img src={Image} alt='404' height='404px'></img>
                </div>
                <div className='text-center mt-3 mb-5'>
                    <h3>The Page You Requested Could Not Be Found</h3>
                </div>
                 
            </div>
         );
    }
}
 

const MapstatetoProps=(state)=>{
    return {
        Header:state.Header
    }
}

export default connect(MapstatetoProps,{IniLoginRegister}) (NotFound);