import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader,Form, ModalFooter,Row,Col} from "reactstrap";
import { API_URL } from "../helper";
import {productAction} from '../redux/actions'

class ModalDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            disable: false,
            btn : "Edit",
            // stock : this.props.produk[this.props.selectedId].stock,
            // images : this.props.produk[this.props.selectedId].images
            stock : [],
            images :[]
         }
    }

    btnEdit=()=>{
        this.setState({
            disable : !this.state.disable
        })
    }

    printStock=()=>{
        if(this.props.produk[this.props.selectedId].stock){
            return this.props.produk[this.props.selectedId].stock.map((item,index)=>{
                return(
                    <Row>
                        <Col>
                            <Input disabled={!this.state.disable} type="text" defaultValue={item.type}  onChange={(e)=>this.handleType(e,index)}/>
                        </Col>
                        <Col>
                            <Input disabled={!this.state.disable} type="number" defaultValue={item.qty} onChange={(e)=>this.handleQty(e,index)}/>
                        </Col>
                        <Col>
                            <Button  type="button" color="danger" outline disabled={!this.state.disable}>
                                Delete
                            </Button> 
                        </Col>
                    </Row>
                )
            }

            )
        }
    }

    printImages = () => {
        if (this.props.produk[this.props.selectedId].images) {
            return this.props.produk[this.props.selectedId].images.map((item, index) => {
                return <Input disabled={!this.state.disable} type="text" defaultValue={item} placeholder={`Images-${index + 1}`} onChange={(e)=>this.handleImages(e,index)}/>
            })
        }
    }

    btnSave=()=>{
        let data={
            nama : this.inNama.value,
            brand : this.inBrand.value,
            kategori : this.inKategori.value,
            deskripsi : this.inDeskripsi.value,
            harga : this.inHarga.value,
            // stock : this.state.stock,
            // images : this.state.images
            stock : this.state.stock.length == 0 ? this.props.produk[this.props.selectedId].images : this.state.stock,
            images : this.state.images.length == 0 ? this.props.produk[this.props.selectedId].images : this.state.images
        }
        console.log("testing save", data)
        axios.patch(`${API_URL}/products/${this.props.produk[this.props.selectedId].id}`,data)
        .then((res)=>{
            this.props.productAction();
            this.props.btCancel()
            this.setState({stock:[],images:[]})
        }).catch((err)=>{
            console.log(err)
        })
    }

    handleImages = (e,index) =>{
        let temp =[...this.props.produk[this.props.selectedId].images]
        temp [index] = e.target.value
        this.setState({images : temp})
    }

    handleType = (e,index) =>{
        let temp = [...this.props.produk[this.props.selectedId].stock];
        temp[index].type=e.target.value
        this.setState({stock:temp})
    }
    handleQty = (e,index) =>{
        let temp = [...this.props.produk[this.props.selectedId].stock];
        temp[index].qty=e.target.value
        this.setState({stock:temp})
    }

    render() { 
        return (
            <div>
            <Modal isOpen={this.props.modal} toggle={this.props.btCancel}>
                <ModalHeader toggle={this.props.btCancel}>
                    Detail Product
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="nama">
                                Nama
                            </Label>
                            <Input id="nama" defaultValue={this.props.produk[this.props.selectedId].nama} disabled={!this.state.disable} innerRef={(el)=>this.inNama=el}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="deskripsi">
                                Deskripsi
                            </Label>
                            <Input id="deskripsi" type="textarea" defaultValue={this.props.produk[this.props.selectedId].deskripsi} disabled={!this.state.disable} innerRef={(el)=>this.inDeskripsi=el}/>
                        </FormGroup>
                        <FormGroup>
                            <div className="row">
                                <div className="col-6"> 
                                    <Label for="brand">
                                        Brand
                                    </Label>
                                <Input id="brand" defaultValue={this.props.produk[this.props.selectedId].brand} disabled={!this.state.disable} innerRef={(el)=>this.inBrand=el}/>                            
                                </div>
                                <div className="col-6"> 
                                    <Label for="Kategori" >
                                        Kategori
                                    </Label>
                                <Input id="kategori" defaultValue={this.props.produk[this.props.selectedId].kategori} disabled={!this.state.disable} innerRef={(el)=>this.inKategori=el}/>                            
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="harga">
                                Harga
                            </Label>
                            <Input id="harga" type="number" defaultValue={this.props.produk[this.props.selectedId].harga} disabled={!this.state.disable} innerRef={(el)=>this.inHarga=el}/>
                        </FormGroup>
                        <FormGroup>
                            <div className="row">
                                    <Label>
                                        Stock
                                    </Label>
                                    {this.printStock()}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="images">
                                Image(URL)
                            </Label>
                            {this.printImages()}
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    {
                        this.state.disable ?
                            <Button type="button" color="primary" onClick={this.btnSave}>Save</Button>
                            : <Button type="button" color="primary" onClick={this.btnEdit}>Edit</Button>
                    }
                    <Button color="warning" onClick={this.props.btCancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            </div> 
         );
    }
}
 
export default connect(null,{productAction})(ModalDetail);