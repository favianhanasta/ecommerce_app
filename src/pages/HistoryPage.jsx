import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Badge,Button } from 'reactstrap';
import ModalTransaki from '../component/ModalTransaksi';
import { API_URL } from '../helper';
import {updateUserCart} from '../redux/actions'


class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            transaksi : [],
            openModal : false,
            detail :{},
            detailSelectedIdx : null
         }
    }

    componentDidMount(){
        axios.get(`${API_URL}/userTransactions?iduser=${this.props.iduser}`)
        .then((res)=>{
            this.setState({transaksi:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    printHistory =()=>{
        return this.state.transaksi.map((value,index)=>{
            return <div className="shadow  rounded pb-3">
                <div className="shadow-sm p-2 bg-dark" style={{color:"white"}}>
                    <span>{value.date} <Badge color="warning">{value.status}</Badge></span><b style={{marginLeft:20}}>{value.invoice}</b>
                </div>
                <div className="row">
                    <div className="col-md-1 m-auto">
                        <img src={value.detail[0].image} width="100%"/>
                    </div>
                    <div className="col-md-7 d-flex flex-column justify-content-center my-3" style={{borderRight:"1px solid gray"}}>
                        <h4>{value.detail[0].nama}</h4>
                        <p className="text-muted">{value.detail[0].qty} x Rp.{(value.detail[0].harga).toLocaleString()}</p>
                        <a style={{cursor:"pointer"}}><p className="text-muted">+ {value.detail.length - 1} produk lainnya</p></a>
                    </div>
                    <div className="col-md-4 my-3">
                        <p className="text-muted">Total Belanja</p>
                        <h4 style={{ fontWeight:"bold"}} > Rp. {value.totalPayment.toLocaleString()}</h4>

                    </div>
                </div>
                <div style={{textAlign:"right"}}>
                    <Button color="danger">Batalkan Pesanan</Button>
                    <Button color="primary mr-3" outline style={{border : "none"}} onClick={()=> this.setState({openModal : !this.state.openModal, detail : value, detailSelectedIdx:index})} >Lihat Detail produk</Button>
                </div>

            </div>
        })
    }

    render() { 
        console.log("l",this.state.detail)
        return ( 
            <div className="container">
                <ModalTransaki
                    dataTransaksi={this.state.detail}
                    // dataTransaksi = { this.state.transaksi[this.state.detailSelectedIdx]}
                    openModal ={this.state.openModal}
                    toggleModal ={()=> this.setState({openModal:!this.state.openModal})}
                />
                <h1 className="text-center my-3">
                    Transaction Page
                </h1>               
                {this.printHistory()}
                
            </div>
         );
    }
}

const mapToProps = (state) =>{
    return {
        iduser : state.userReducer.id,
        role : state.userReducer.state
    }
}

export default connect(mapToProps) (HistoryPage);