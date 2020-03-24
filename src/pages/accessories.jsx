import React, {Component} from 'react';
import Numeral from 'numeral'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {API_URL} from '../supports/ApiUrl'
import './css/pages.css'
import {Button} from 'reactstrap'

class Accessories extends Component {
    state = { 
        products:[],
        search:''
     }

    componentDidMount(){
        Axios.get(`${API_URL}/products?kategoriId=5`)
        .then((res)=>{
            this.setState({products:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    nameAscending=()=>{
        Axios.get(`${API_URL}/products?q=${this.state.search}&kategoriId=5&_sort=name&_order=asc`)
        .then((resNameAsc)=>{
            this.setState({products:resNameAsc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    nameDescending=()=>{
        Axios.get(`${API_URL}/products?q=${this.state.search}&kategoriId=5&_sort=name&_order=desc`)
        .then((resNameDesc)=>{
            this.setState({products:resNameDesc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
        
    priceAscending=()=>{
        Axios.get(`${API_URL}/products?q=${this.state.search}&kategoriId=5&_sort=harga&_order=asc`)
        .then((resNameAsc)=>{
            this.setState({products:resNameAsc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    priceDescending=()=>{
        Axios.get(`${API_URL}/products?q=${this.state.search}&kategoriId=5&_sort=harga&_order=desc`)
        .then((resNameDesc)=>{
            this.setState({products:resNameDesc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    searchOnChange=(e)=>{
        this.setState({[e.target.name]:e.target.value}, function () {
            console.log(this.state.value);
        });
        console.log(this.state.search)
        Axios.get(`${API_URL}/products?kategoriId=5&name_like=${this.state.search}`)
        .then((resSearch)=>{
            this.setState({products:resSearch.data})
        }).catch((err)=>{
            console.log('error nie')
        })
    }

    // http://localhost:2000/products?q=dog

    // searchName=(input)=>{
       
    // }

    render() { 
        return ( 
            <div>
                <div className='allproduct-container'>
                    <div className='allproduct-satu border'>
                        <div style={{marginBottom:'5px' }} className='text-center'>
                            <h3 className='mt-5'>Search:</h3>
                            <p>by Name</p>
                            <input type='text' name='search' onChange={this.searchOnChange} ></input>

                            <h3 className='mt-5'>Sort:</h3>
                            <Button onClick={this.nameAscending} color="link">by Name(Asc)</Button>
                            <Button onClick={this.nameDescending} color="link">by Name(Desc)</Button>
                            <Button onClick={this.priceAscending} color="link">by Price(Cheaper)</Button>
                            <Button onClick={this.priceDescending} color="link">by Price(Expensive)</Button>
                        </div>
                    </div>
                    <div className='allproduct-dua'>
                    <h2 className='allproduct-header'>Accessories</h2>
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
 
export default Accessories;