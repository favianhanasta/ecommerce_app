import React from 'react';
import { Modal, ModalBody, ModalHeader,Button, Card } from 'reactstrap';

const ModalTransaki =(props)=>{

    const totalQty = ()=>{
        let total=0
            props.dataTransaksi.detail.forEach((val) => {
                total += val.qty   
            });
            return total
    }

    const printDetailProduk =()=>{
        return props.dataTransaksi.detail.map((val,idx)=>{
            return(
                <Card>
                    <div className="row">
                        <div className="col-md-2">
                            <img src={val.image} width="100%"/>
                        </div>
                        <div className="col-md-7">
                            <p style={{fontWeight:"bold"}}>{val.nama}</p>
                            <p className="text-muted"> {val.qty} X Rp.{val.harga.toLocaleString()}</p>    
                        </div>
                        <div className="col-md-3">
                            <p>Total Harga</p>
                            <p style={{fontWeight:'bold'}}>Rp.{val.totalHarga.toLocaleString()}</p>
                        </div>
                    </div>
                </Card>
                )

        })
    }

    return(
        <Modal isOpen={props.openModal} toggle={props.toggleModal} size="lg" >
            <ModalHeader className="d-block shadow-sm">
                <span className="material-icons" style={{float:'right',cursor:'pointer'}} onClick={props.toggleModal}>
                    close
                </span>
                <div style={{textAlign:'center'}}>
                    <h4 style={{fontWeight:'700'}}>Detail Transaksi</h4>
                </div>
            </ModalHeader>
            <ModalBody>
                {
                    props.dataTransaksi ?
                    <div className="row">
                    <div className="col-md-9 px-0" style={{backgroundColor:"#dfe6e9"}}>
                        <Card className="px-4" style={{border:"none"}}>
                            <p style={{fontWeight:"bold"}}>{props.dataTransaksi.status}</p>
                            <span className="d-flex justify-content-between">
                                <p >No.Invoice</p>
                                <p style={{fontWeight:"bold",color:"#007CC3"}}>{props.dataTransaksi.invoice}</p>
                            </span>
                            <span className="d-flex justify-content-between" >
                                <p >Tanggal Pembelian</p>
                                <p>{props.dataTransaksi.date}</p>
                            </span>
                        </Card>
                        <Card className="px-4 my-2 py-2" style={{border:"none"}}>
                            <p style={{fontWeight:"bold"}}>Detail Produk</p>
                            {printDetailProduk()}
                        </Card>
                        <Card className="px-4 mt-2" style={{border:"none"}}>
                            <p style={{fontWeight:"bold"}}>Rincian Pembayaran</p>
                            <span className="d-flex justify-content-between">
                                <p >Total Harga ({totalQty()}) barang </p>
                                <p style={{fontWeight:"bold",color:"#007CC3"}}>Rp. {(props.dataTransaksi.totalPayment-props.dataTransaksi.ongkir).toLocaleString()}</p>
                            </span>
                            <span className="d-flex justify-content-between">
                                <p >Total Ongkos Kirim</p>
                                <p style={{fontWeight:"bold",color:"#007CC3"}}>Rp.{props.dataTransaksi.ongkir.toLocaleString()}</p>
                            </span>
                            <span className="d-flex justify-content-between">
                                <p >Total Bayar</p>
                                <p style={{fontWeight:"bold",color:"#007CC3"}}>Rp.{props.dataTransaksi.totalPayment.toLocaleString()}</p>
                            </span>
                        </Card>
                    </div>
                    <div className="col-md-3 p-3">
                        <Button outline size="lg" style={{width:"100%"}} className="my-2">Chat Penjual</Button>
                        <Button outline size="lg" style={{width:"100%"}}>Bantuan</Button>
                    </div>
                    </div>
                    :
                    <p style={{textAlign:"center"}}>No Data</p>
                }
            </ModalBody>
        </Modal>
    )
}

export default ModalTransaki;