import React from "react";
import axios from "axios";
import { API_URL } from "../helper";
import { Container, Form,Row,Col, FormGroup, UncontrolledCollapse,Button, Input, Toast, ToastHeader, ToastBody } from "reactstrap";

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            detail:[],
            selectedIdImage:null,
            thumbnailIdx:0,
            jumlahQty:1,
            idStock:null,
            selectedType:[],
            toastOpen:false,
            toastHeader:"",
            toastBody:""
         }
    }

    componentDidMount(){
        console.log("cek url", window.location)
        axios.get(`${API_URL}/products${window.location.search}`)
        .then((response)=>{
            console.log(response.data)
            this.setState({detail: response.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    btnIncrement=()=>{
        let {selectedType,jumlahQty} = this.state
        if(selectedType.qty){
            if(jumlahQty < selectedType.qty){
                this.setState({
                    jumlahQty : jumlahQty += 1,
                })
            }else{
                this.setState({toastOpen: !this.state.toastOpen})
            }
        }
        
        
    }

    btnDecrement=()=>{
        if(this.state.jumlahQty!=1){
            this.setState({
            jumlahQty : this.state.jumlahQty -= 1,
            toastOpen : false
            })
        }
        
    }

    render() {
        return ( 
            <div className="container  pt-3">
                <div>
                <Toast isOpen={this.state.toastOpen} style={{position:"fixed",left:10}}>
                    <ToastHeader icon="warning" toggle={()=> this.setState({toastOpen: false})}>
                        <strong className="me-auto">Add to Cart Warning</strong>
                    </ToastHeader>
                    <ToastBody>
                        Stok Produk Tidak Cukup
                    </ToastBody>
                </Toast>
                </div>
                {
                  this.state.detail.map((value,index)=>{
                    return (
                        <Container className="shadow p-3 bg-white rounded">
                        <Row>
                        <Col className="d-flex" style={{paddingRight:"0"}}>
                            <div style={{width:"15%"}} className="pl-3 mr-4">
                            {
                                value.images.map((val,idx)=>{
                                    if(this.state.thumbnailIdx == idx){
                                        return (
                                            <div className="mb-2 shadow-sm bg-white rounded p-1" style={{borderBottom:"5px solid #0984E3"}}>
                                                <img src={val} style={{cursor:"pointer"}} width="100%" onClick={()=>this.setState({thumbnailIdx:idx})}/>
                                            </div>
                                            )
                                    }else{
                                        return (
                                            <div className="mb-2 shadow-sm bg-white rounded">
                                                <img src={val} style={{cursor:"pointer"}} width="100%" onClick={()=>this.setState({thumbnailIdx:idx})}/>
                                            </div>
                                            )
                                    }
                                })
                            }
                            </div>
                            <div className="text-center">
                                <img style={{marginLeft:"auto"}} src={value.images[this.state.thumbnailIdx]} width="100%" className="shadow-sm  bg-white rounded"/>
                            </div>
                                
                        </Col>
                        <Col className="ml-4">
                            <Form className="pr-5">                        
                                <h4 className="h4" style={{fontWeight:"bolder"}}>{value.nama}</h4>                        
                                <p className="lead">{value.kategori}</p>
                                <h1 className="h1" style={{fontWeight:"bolder"}}>IDR {value.harga.toLocaleString()}</h1>
                                <div style={{ borderBottom: '1.5px solid gray',borderTop: '1.5px solid gray' }}>
                                {
                                    this.state.idStock != null?
                                    <p className="font-weight-bold my-1" id="toggler" style={{cursor:"pointer"}}>Type : {value.stock[this.state.idStock].type}</p>
                                    : <p className="font-weight-bold my-1" id="toggler" style={{cursor:"pointer"}}>Type :</p>
                                }
                                </div>
                                    {
                                    value.stock.map((value,idx)=>{
                                        return (
                                        <FormGroup className="text-muted my-0">
                                        <UncontrolledCollapse toggler="#toggler" style={{cursor:"pointer"}}>
                                                    <p onClick={()=>this.setState({idStock : idx,selectedType:value})}>{value.type} : {value.qty} </p>
                                        </UncontrolledCollapse>
                                        </FormGroup>
                                        )
                                            })
                                    }
                                                       
                                <p style={{textAlign:"justify"}}>{value.deskripsi}</p>
                                <FormGroup>
                                    <div className="row">
                                        <div className="col-3">
                                            <p>Jumlah :</p>
                                        </div>
                                        <div className="col-4 d-flex align-items-center justify-content-end">
                                            <Button color="secondary" onClick={this.btnDecrement} style={{fontWeight:"bolder"}}> - </Button>
                                            <p className="mx-3 h6">{this.state.jumlahQty}</p>
                                            <Button color="success" onClick={this.btnIncrement} style={{fontWeight:"bolder"}}> + </Button>
        
                                        </div>
                                    </div>
                                </FormGroup>
                                <Button color="warning" style={{width:"100%"}}  className="mb-2">Add to Cart</Button>                                                                
                            </Form>        
                        </Col>        
                        </Row>
                        </Container>
                        
                    )
                })  
                }
                              
            </div>
         );
    }
}
 
export default ProductDetail;