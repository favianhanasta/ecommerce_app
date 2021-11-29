import React from "react";
import axios from "axios";
import { API_URL } from "../helper";
import { Container, Form,Row,Col, FormGroup, UncontrolledCollapse,Button } from "reactstrap";

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            detail:[],
            selectedIdImage:null,
            thumbnailIdx:0,
            jumlahCounter:0,
            idStock:null
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
        this.setState({
            jumlahCounter : this.state.jumlahCounter += 1
        })
    }

    btnDecrement=()=>{
        if(this.state.jumlahCounter!=0){
            this.setState({
                jumlahCounter : this.state.jumlahCounter -= 1
            })
        }
    }

    render() { 
        return ( 
            <div className="container-fluid pt-3">
                {
                  this.state.detail.map((value,index)=>{
                    return (
                        <Container className="shadow p-5 bg-white rounded">
                        <Row>
                        <Col className="d-flex" style={{paddingRight:"0"}}>
                            <div style={{width:"15%"}} className="pl-3 mr-4">
                            {
                                value.images.map((val,idx)=>{
                                    if(this.state.thumbnailIdx == idx){
                                        return (
                                            <div className="my-3 shadow-sm bg-white rounded p-1" style={{borderBottom:"5px solid #0984E3"}}>
                                                <img src={val} style={{cursor:"pointer"}} width="100%" onClick={()=>this.setState({thumbnailIdx:idx})}/>
                                            </div>
                                            )
                                    }else{
                                        return (
                                            <div className="my-3  shadow-sm bg-white rounded">
                                                <img src={val} style={{cursor:"pointer"}} width="100%" onClick={()=>this.setState({thumbnailIdx:idx})}/>
                                            </div>
                                            )
                                    }
                                })
                            }
                            </div>
                            <div>
                                <img style={{marginLeft:"auto"}} src={value.images[this.state.thumbnailIdx]} width="100%" className="shadow-sm  bg-white rounded"/>
                            </div>
                                
                        </Col>
                        <Col className="ml-4">
                            <Form className="pr-5">                        
                                <h3 className="h3" style={{fontWeight:"bolder"}}>{value.nama}</h3>                        
                                <p className="lead">{value.kategori}</p>
                                <h1 className="h1" style={{fontWeight:"bolder"}}>IDR {value.harga.toLocaleString()}</h1>
                                {
                                    this.state.idStock != null?
                                    <p className="font-weight-bold my-1" id="toggler" style={{cursor:"pointer"}}>Type : {value.stock[this.state.idStock].type}</p>
                                    : <p className="font-weight-bold my-1" id="toggler" style={{cursor:"pointer"}}>Type :</p>
                                }
                                    {
                                    value.stock.map((value,idx)=>{
                                        return (
                                        <FormGroup>
                                        <UncontrolledCollapse toggler="#toggler" style={{cursor:"pointer"}}>
                                                    <p onClick={()=>this.setState({idStock : idx})}>{value.type} : {value.qty} </p>
                                        </UncontrolledCollapse>
                                        </FormGroup>
                                        )
                                            })
                                    }
                                                       
                                <p>{value.deskripsi}</p>
                                <FormGroup>
                                    <div className="row">
                                        <div className="col-3">
                                            <p>Jumlah :</p>
                                        </div>
                                        <div className="col-4 d-flex align-items-center justify-content-end">
                                            <Button color="secondary" onClick={this.btnDecrement} style={{fontWeight:"bolder"}}> - </Button>
                                            <p className="h6 mx-3"> {this.state.jumlahCounter} </p>
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