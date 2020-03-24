import React, {Component} from 'react';
import Numeral from 'numeral'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {API_URL} from '../supports/ApiUrl'
import './css/pages.css'
import {Button} from 'reactstrap'

class AllProduct extends Component {
    state = { 
        products:[],
        search:'',
        
     }

    componentDidMount(){
        Axios.get(`${API_URL}/products?expand=kategori`)
        .then((res)=>{
            this.setState({products:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    type_dog=()=>{
        Axios.get(`${API_URL}/products?kategoriId=1`)
        .then((res_dog)=>{
            this.setState({products:res_dog.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    type_cat=()=>{
        Axios.get(`${API_URL}/products?kategoriId=2`)
        .then((res_cat)=>{
            this.setState({products:res_cat.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    type_toys=()=>{
        Axios.get(`${API_URL}/products?kategoriId=3`)
        .then((res_toys)=>{
            this.setState({products:res_toys.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    type_grooming=()=>{
        Axios.get(`${API_URL}/products?kategoriId=4`)
        .then((res_grooming)=>{
            this.setState({products:res_grooming.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    type_accessories=()=>{
        Axios.get(`${API_URL}/products?kategoriId=5`)
        .then((res_accessories)=>{
            this.setState({products:res_accessories.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    
    nameAscending=()=>{
        Axios.get(`${API_URL}/products?q=${this.state.search}&_sort=name&_order=asc`)
        .then((resNameAsc)=>{
            this.setState({products:resNameAsc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    nameDescending=()=>{
        Axios.get(`${API_URL}/products?q=${this.state.search}&_sort=name&_order=desc`)
        .then((resNameDesc)=>{
            this.setState({products:resNameDesc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    typeAscending=()=>{
        Axios.get(`${API_URL}/products?q=${this.state.search}&_sort=kategoriId&_order=asc`)
        .then((resNameAsc)=>{
            this.setState({products:resNameAsc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    typeDescending=()=>{
        Axios.get(`${API_URL}/products?q=${this.state.search}&_sort=kategoriId&_order=desc`)
        .then((resNameDesc)=>{
            this.setState({products:resNameDesc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
        
    priceAscending=()=>{
        Axios.get(`${API_URL}/products?q=${this.state.search}&_sort=harga&_order=asc`)
        .then((resNameAsc)=>{
            this.setState({products:resNameAsc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    priceDescending=()=>{
        Axios.get(`${API_URL}/products?q=${this.state.search}&_sort=harga&_order=desc`)
        .then((resNameDesc)=>{
            this.setState({products:resNameDesc.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    searchOnChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state.search)
        Axios.get(`${API_URL}/products?name_like=${this.state.search}`)
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
                <div>
                </div>

                <div className='allproduct-container'>
                    <div className='allproduct-satu border'>
                        <div style={{marginBottom:'5px' }} className='text-center'>
                            <h3 className='mt-5'>Search:</h3>
                            <p>by Name</p>
                            <input type='text' name='search' onChange={this.searchOnChange} ></input>
                            <p className='mt-3'>by Type</p>
                            <button onClick={this.type_dog} className='column'>DogFood</button> &nbsp;
                            <button onClick={this.type_cat} >CatFood</button> &nbsp;
                            <button onClick={this.type_toys}>Toys</button> &nbsp;
                            <button onClick={this.type_grooming}>Grooming</button> &nbsp;
                            <button onClick={this.type_accessories} className='mt-2' >Accessories</button> &nbsp;

                           
                            <h3 className='mt-5'>Sort:</h3>
                            <Button onClick={this.nameAscending} color="link">by Name(Asc)</Button>
                            <Button onClick={this.nameDescending} color="link">by Name(Desc)</Button>
                            <Button onClick={this.typeAscending} color="link">by Type(Asc)</Button>
                            <Button onClick={this.typeDescending} color="link">by Type(Desc)</Button>
                            <Button onClick={this.priceAscending} color="link">by Price(Cheaper)</Button>
                            <Button onClick={this.priceDescending} color="link">by Price(Expensive)</Button>
                        </div>
                    </div>
                    <div className='allproduct-dua'>
                    <h2 className='allproduct-header'>All Product</h2>
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
 
export default AllProduct;