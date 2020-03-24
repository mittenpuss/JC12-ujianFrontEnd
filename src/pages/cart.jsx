import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "./../supports/ApiUrl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Input} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { changetoRupiah } from "../supports/changeToRp";
import {countCart} from './../redux/actions'
const MySwal = withReactContent(Swal);


//MASIH ERROR MASSSSSSSS

class Cart extends Component {
  state = {
    isicart: [],
    modal:false
  };

toggle = () => {
    this.setState({modal:!this.state.modal});
}

componentDidMount() {
    this.getdata();
  }

getdata = () => {
    Axios.get(
      `${API_URL}/transactions?_embed=transactiondetails&userId=${this.props.User.id}&status=oncart`
    )
      .then(res => {
        var newarr = [];
        res.data[0].transactiondetails.forEach(element => {
          newarr.push(
            Axios.get(`${API_URL}/products/${element.productId}`)
          );
        });

        Axios.all(newarr)
        .then(res2 => {
          res2.forEach((val, index) => {
            res.data[0].transactiondetails[index].dataprod = val.data;
          });
          console.log(res.data[0].transactiondetails);
          this.setState({ isicart: res.data[0].transactiondetails });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
totalharga=()=>{
    let total=0
    this.state.isicart.forEach((val)=>{
        total+=val.qty*val.dataprod.harga
    })

    return(
        <div className='d-flex justify-content-around '>
            <div className='ml-5'>
                <p className='text-center'>Total</p> 
            </div>
            <div>
                <p className='text-center'>{changetoRupiah(total)}</p>
            </div>
        </div>
    )
}

renderisidata = () => {
    return this.state.isicart.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.dataprod.name}</td>
          <td>
            <img src={val.dataprod.image} height="200" alt="" />
          </td>
          <td>{val.dataprod.deskripsi}</td>
          <td>{val.qty}</td>
          <td>{val.dataprod.harga}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteconfirm(index, val.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

deleteconfirm = (index, id) => {
    MySwal.fire({
      title: `Are you sure wanna delete ${this.state.isicart[index].dataprod.name} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        Axios.delete(`${API_URL}/transactiondetails/${id}`)
          .then(res => {
            MySwal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            ).then(result => {
              if (result.value) {
                this.getdata();
                this.props.countCart(this.props.User.id)
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };
  
  render() {
      
    if(this.props.User.role==='admin'){
        return <Redirect to='/notfound' />
    }

    return (
      <div className="paddingatas">
        <Table striped>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Pict</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.renderisidata()}</tbody>
          <tfoot>{this.totalharga()}</tfoot>
        </Table>        

            <Button color="danger" onClick={this.toggle}>Checkout</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Pembayaran</ModalHeader>
                <ModalBody>
                <Input type='select'>
                    <option>Credit Card</option>
                </Input>
                <Input classname='mt-5' type='number' placeholder='masukkan nomor kartu kredit'></Input>
                
                </ModalBody>
                <ModalFooter>
                <Button color="success" onClick={this.toggle}>Bayar</Button>{' '}
                <Button color="danger" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

    </div>
    );
  }
}

const MapstatetoProps = state => {
  return {
    User: state.Auth,
    Total:state.Total
  };
};

export default connect(MapstatetoProps,{countCart})(Cart);
