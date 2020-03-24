import React, { useState } from 'react';
import logoheader from '../pages/image/Cosmopawlitan3.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';
import {connect} from 'react-redux'
import {searchItem, Logout} from '../redux/actions'
import {FaUserCircle} from 'react-icons/fa'
import { FiShoppingCart } from "react-icons/fi";
import {FaSearch} from 'react-icons/fa'
import './css/component.css'


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search,setSearch] = useState({
    searchInput:''
  })
  const toggle = () => setIsOpen(!isOpen);
  
  //Onchange untuk Search Bar
  const onChangeSearch=(e)=>{
    setSearch({...search,[e.target.name]:e.target.value})
    console.log(search.searchInput)
  }

  //Untuk Logout
  const onClickLogout=()=>{
    localStorage.clear()
    props.Logout()
    console.log(props.User.islogin)
  }
  
  //Untuk Search
  const onSubmitSearch=()=>{
  props.searchItem(search)
  }

  return (
    <div className='header'>
      <Navbar className='bg-header' light expand="md">
                <NavbarBrand href="/">
                    <img style={{marginLeft:'55px'}} fixed='top' src={logoheader} alt='logo' height='90px'></img>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />     

        <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto ml-5 bg-header login" navbar>
              <NavItem>
                  <NavLink className='mr-3' href="/dog">DOG</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink className='mr-3'href="/cat">CAT</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink className='mr-3'href="/toys">TOYS</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink className='mr-3'href="/grooming">GROOMING</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink className='mr-3 'href="/accessories">ACCESSORIES</NavLink>
              </NavItem>
              {
                props.User.role==='admin'?
                <NavItem>
                    <NavLink className='font-weight-bold' href="/manageadmin">MANAGE ADMIN</NavLink>
                </NavItem>
                :
                null
              }
              {
                props.User.role==='admin'?
                <NavItem>
                    <NavLink className='font-weight-bold' href="/confirmbuy">CONFIRM BUY</NavLink>
                </NavItem>
                :
                null
              }
            
          </Nav>

          {/* CART, jika 'admin' cart tidak akan keluar */}
          {
              props.User.islogin&&props.User.role==='user'?
              <NavLink href="/cart" className='text-dark cart'>
                  <FiShoppingCart/>&nbsp; CART({props.Total.cart}) &nbsp;&nbsp;&nbsp;
              </NavLink>
              :
              null
          }

          {/* REGISTER, jika sudah login tidak akan keluar */}
          {
              !props.User.islogin?
              <NavLink href="/register" className='loginlogout font-weight-bold'>REGISTER</NavLink>
              :
              null
          }

          
          {/* LOGIN LOGOUT */}
          
          <NavbarText className='mr-5'>
              {
              props.User.username?
              <div className='d-flex'>
                <NavLink href="/profile" className='loginlogout font-weight-bold'><FaUserCircle/> {props.User.username}</NavLink>                
                <NavLink onClick={onClickLogout} href="/" className='loginlogout font-weight-bold'>LOGOUT</NavLink>
                
              </div>
              :
              <div>
                <NavLink href="/login" className='loginlogout font-weight-bold'>LOGIN</NavLink>
              </div>
              }
          </NavbarText>
          
        </Collapse>
      </Navbar>
      {
        props.Header.ishalamanloginorregister?
        null
        :
        <div className='search-container'>
        <div>
            
            <input type="text" name='searchInput' onChange={onChangeSearch}/> &nbsp; 
            <a href='/search'>
            <button onClick={onSubmitSearch} style={{width:'30px'}}><FaSearch/></button>
            </a>
        </div>
        </div>
      }
    </div>
  );
}

const MapstatetoProps=(state)=>{
    return{
        User:state.Auth,
        Header:state.Header,
        Total:state.Total
    }
}
 

export default connect(MapstatetoProps,{searchItem,Logout})(Header);