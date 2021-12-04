import React from "react";
import { API_URL } from "../helper";
import { Container, Table,Button,Modal,ModalHeader, Input,Col,Row,ButtonGroup, InputGroupText, Label,Form,FormGroup} from "reactstrap";
import {updateUserCart} from '../redux/actions'
import { connect } from "react-redux";
import axios from 'axios';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            detail :[],
            paymentItem : [900000,700000],
            totalPayment : 0,
         }
    }

    componentDidMount(){
        this.printTotalPayment()
    }

    onBtInc=(index)=>{
        this.props.cart[index].qty += 1
        this.props.cart[index].totalHarga += this.props.cart[index].harga
        console.log("qty", this.props.cart[index].totalHarga)
        axios.patch(`${API_URL}/dataUser/${this.props.iduser}`,{cart:this.props.cart})
        .then((res)=>{
            this.props.updateUserCart(res.data.cart)
        }).catch((err)=>{
            console.log(err)
        })
    }

    onBtDec=(index)=>{
        if(this.props.cart[index].qty > 1){
            this.props.cart[index].qty -= 1
            this.props.cart[index].totalHarga -= this.props.cart[index].harga
            console.log("qty", this.props.cart[index].qty)
            axios.patch(`${API_URL}/dataUser/${this.props.iduser}`,{cart:this.props.cart})
            .then((res)=>{
                this.props.updateUserCart(res.data.cart)
                // this.setState({
                //     paymentItem : this.state.paymentItem-this.props.cart[index].harga
                // })
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    onBtRemove = (index) =>{
        this.props.cart.splice(index,1)
        axios.patch(`${API_URL}/dataUser/${this.props.iduser}`,{cart:this.props.cart})
            .then((res)=>{
                this.props.updateUserCart(res.data.cart)
            }).catch((err)=>{
                console.log(err)
            })
        
    }

    printTotalPayment =()=>{
        let total = this.state.totalPayment
        this.props.cart.forEach((val) => {
            total += val.totalHarga    
        });
        return this.setState({totalPayment : total})
    }

    printCart =()=>{
        return this.props.cart.map((val,idx)=>{
            return (
                    <div className="align-items-center row shadow bg-white rounded mb-3 ml-3">
                            <div className="col-md-4">
                                    <div className="d-flex align-items-center">
                                    <img src={val.image} width="50%" alt="" />
                                <div className="mx-2">
                                    <p className="h5" style={{fontWeight:"bolder"}}>{val.nama}</p>
                                    <p className="h5" style={{fontWeight:"bolder"}}>Rp {val.harga.toLocaleString()}</p>
                                </div>
                            </div>
                            </div>
                            <div className="col-md-1 text-center">
                                <p className="h5" style={{fontWeight:"bolder"}}>{val.type}</p>
                            </div>
                            <div className="d-flex justify-content-center col-md-3">
                                <Button color="secondary" onClick={()=> this.onBtDec(idx)} style={{fontWeight:"bolder"}}> - </Button>
                                <Input className="mx-1" value={val.qty} style={{width:"20%"}}/>                               
                                <Button color="success" onClick={()=>this.onBtInc(idx,val)} style={{fontWeight:"bolder"}}> + </Button>
                            </div>
                            <div className="col-md-2">
                                <p className="h6" style={{fontWeight:"bolder"}}>Rp {(val.totalHarga).toLocaleString()}</p>
                            </div>
                            <div className="col-md-2">
                                <Button color="warning"  style={{fontWeight:"bolder"}} onClick={()=>this.onBtRemove(idx)}> Remove </Button>
                            </div>
                            </div>
            )
        })
    }

    totalPayment = () => {
        let total=0
            this.props.cart.forEach((val) => {
                total += val.totalHarga    
            });
            return <h3 style={{fontWeight:"bolder"}}>Rp {(total).toLocaleString()}</h3>
    }

    render() { 
        return (
            <div>
                <div className="text-center my-4">
                    <h1>Keranjang Belanja</h1>
                </div>
                <div>
                    <div className="container-fluid row justify-content-center">
                        <div className="col-md-8">
                            {this.printCart()}
                        </div>
                        <div className="col-md-4 pb-2 ">
                            <div className="container shadow bg-white rounded py-3 align-items-center m-auto">
                                <h4>Total Payment</h4>
                                {this.totalPayment()}
                                <FormGroup>
                                    <Label for="pengiriman">Biaya Pengiriman</Label>
                                    <Input id="pengiriman" type="number"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="notes">Notes</Label>
                                    <Input id="notes" type="textarea"/>
                                    </FormGroup>
                                <div className="d-flex justify-content-end">
                                <Button color="success"  className="mx-3">Checkout</Button>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                    
                </div>
            </div>
         );
    }
}

const mapToProps = (state) => {
    return {
        cart: state.userReducer.cart,
        iduser : state.userReducer.id
    }
}
 
export default connect(mapToProps,{updateUserCart})(CartPage);