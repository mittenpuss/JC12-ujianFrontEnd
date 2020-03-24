import React, {Component} from 'react';
import Numeral from 'numeral'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {API_URL} from '../supports/ApiUrl'
import './css/pages.css'
import {Button} from 'reactstrap'

class Search extends Component {
    state = { 
        products:[],
        search:''
     }

    componentDidMount(){
        if(localStorage.getItem('search')===''){
        localStorage.setItem('search','""')
        }
        
        let search=localStorage.getItem('search')
        Axios.get(`${API_URL}/products?name_like=${search}`)
        .then((res)=>{
            this.setState({search:search})
            this.setState({products:res.data})
            console.log(this.state.search)
        }).catch((err)=>{
            console.log(err)
        })
    }

    componentWillUnmount(){
        localStorage.removeItem('search')
    }

    nameAscending=()=>{
        Axios.get(`${API_URL}/products?name_like=${this.state.search}&_sort=name&_order=asc`)
        .then((resNameAsc)=>{
            this.setState({products:resNameAsc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    nameDescending=()=>{
        Axios.get(`${API_URL}/products?name_like=${this.state.search}&_sort=name&_order=desc`)
        .then((resNameDesc)=>{
            this.setState({products:resNameDesc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    typeAscending=()=>{
        Axios.get(`${API_URL}/products?name_like=${this.state.search}&_sort=kategoriId&_order=asc`)
        .then((resNameAsc)=>{
            this.setState({products:resNameAsc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    typeDescending=()=>{
        Axios.get(`${API_URL}/products?name_like=${this.state.search}&_sort=kategoriId&_order=desc`)
        .then((resNameDesc)=>{
            this.setState({products:resNameDesc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
        
    priceAscending=()=>{
        Axios.get(`${API_URL}/products?name_like=${this.state.search}&_sort=harga&_order=asc`)
        .then((resNameAsc)=>{
            this.setState({products:resNameAsc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    priceDescending=()=>{
        Axios.get(`${API_URL}/products?name_like=${this.state.search}&_sort=harga&_order=desc`)
        .then((resNameDesc)=>{
            this.setState({products:resNameDesc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    render() { 
        
        let search=localStorage.getItem('search')
        return ( 
            <div>
                <div className='allproduct-container'>
                    <div className='allproduct-satu border'>
                        <div style={{marginBottom:'5px' }} className='text-center'>
                            <h3 style={{marginTop:'100px'}} >Sort:</h3>
                            <Button onClick={this.nameAscending} color="link">by Name(Asc)</Button>
                            <Button onClick={this.nameDescending} color="link">by Name(Desc)</Button>
                            <Button onClick={this.typeAscending} color="link">by Type(Asc)</Button>
                            <Button onClick={this.typeDescending} color="link">by Type(Desc)</Button>
                            <Button onClick={this.priceAscending} color="link">by Price(Cheaper)</Button>
                            <Button onClick={this.priceDescending} color="link">by Price(Expensive)</Button>
                        </div>
                    </div>
                    <div className='allproduct-dua'>
                    <p className='text-center'>{this.state.products.length} results found for {search}</p>
                        <div className='row'>
                            
                        {
                            this.state.products.map((val,index)=>{
                                return (

                                    <div key={index} className='allproduct-dua-test'>
                                        <div>
                                        <Link to={`/productdetail/${val.id}`} >
                                            <img src={val.image} height='200px' width='200px' alt="" />
                                        </Link>
                                        </div>
                                        
                                        <div>
                                            <Link to={`/productdetail/${val.id}`}>
                                                <p className='text-center font-weight-bold text-dark'>{val.name}</p>
                                            </Link>
                                            <p className='text-center'>{'Rp.'+Numeral(val.harga).format(0.0)} </p>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>

            </div>
            
         );
    }
}
 
const MapstatetoProps=(state)=>{
    return{
        User:state.Auth
    }
}

export default connect(MapstatetoProps) (Search);
