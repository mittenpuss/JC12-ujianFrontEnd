import React, { Component } from 'react';
import {connect} from 'react-redux'
import { MDBCarousel,  MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask} from "mdbreact";
import {Button} from 'reactstrap';
import { FaPaw } from "react-icons/fa";
import Numeral from 'numeral'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'
import {BukanHome,IniHome,IniLoginRegister,IniBukanLoginRegister} from './../redux/actions'
import image1 from './image/headersatu.jpg'
import image2 from './image/header1.webp'
import image3 from './image/header2.webp'
import image4 from './image/header3.webp'
import './css/pages.css'


class Home extends Component {
    state = {
        photos:[
            image1,
            image2,
            image3,
            image4
        ],
        products:[]
    }
    

    componentDidMount(){
        this.props.IniHome()
        Axios.get(`${API_URL}/products?_expand=kategori&_limit=5`)
        .then((res)=>{
            this.setState({products:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    componentWillUnmount=()=>{
        console.log('jalan unmount')
        this.props.bukan()
    }

    renderphoto=()=>{
        return this.state.photos.map((val,index)=>{
            return (
                <MDBCarouselItem key={index} itemId={index+1}>
                    <MDBView>
                        <div>
                            <img
                                className='foto-carousel'
                                // className=""
                                src={val}
                                alt="Header"
                                //height='100%'
                            />
                        </div>
                        <MDBMask overlay="black-slight" />
                    </MDBView>
                </MDBCarouselItem>
            )
        })
    }

    renderProducts=()=>{
        return this.state.products.map((val,index)=>{
            return (

                <div key={index} className='recommendation'>
                    <div className='recommendation2'>
                    <Link to={`/productdetail/${val.id}`} >
                        <img className='product-img' src={val.image} height='100%' alt="" />
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

    

    render() {

        if(this.props.Header.ishalamanloginorregister===true){
            this.props.IniBukanLoginRegister()
            }


        return (
            <div>
                <MDBCarousel
                    className='carousel'
                    activeItem={1}
                    length={this.state.photos.length}
                    interval={3000}
                    showIndicators={false}
                    showControls={false}
                >
                    <MDBCarouselInner>
                        {this.renderphoto()}
                    </MDBCarouselInner>
                </MDBCarousel>

                <div className='px-5 pt-3'>
                    <div className='text-center'><FaPaw/> &nbsp; Our Recommendation &nbsp; <FaPaw/></div>
                    <div className='master-recommendation'>
                    {this.renderProducts()}
                    </div>
                    <div className='d-flex align-items-center justify-content-center mb-4'>
                    <Button href='/product' color='deep-orange'>See All Product</Button>
                    </div>
                   
                </div>
            </div>
        )
    }
}

const MapstatetoProps=(state)=>{
    return{
        Auth:state.Auth,
        Header:state.Header

    }
}

export default connect(MapstatetoProps,{bukan:BukanHome,IniHome,IniLoginRegister,IniBukanLoginRegister}) (Home);