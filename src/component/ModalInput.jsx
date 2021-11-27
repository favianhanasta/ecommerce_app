import React from "react";
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader,Form, ModalFooter,Row,Col} from "reactstrap";


class ModalInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            disable: false,
            btn : "Edit",
            counter:0,
            arrAddStock:[]
         }
    }

    btnEdit=()=>{
        this.setState({
            disable : !this.state.disable
        })
    }
    
    render() { 
        return (
            <div>
            <Modal isOpen={this.props.modalInput} toggle={this.props.toggleInput}>
                <ModalHeader toggle={this.props.toggleInput}>
                    Detail Product
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="nama">
                                Nama
                            </Label>
                            <Input id="nama" onChange={(event)=> {this.props.handleInput(event.target.value, "nama")}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="deskripsi">
                                Deskripsi
                            </Label>
                            <Input id="deskripsi" type="textarea" onChange={(event)=> this.props.handleInput(event.target.value, "deskripsi")}/>
                        </FormGroup>
                        <FormGroup>
                            <div className="row">
                                <div className="col-6"> 
                                    <Label for="brand">
                                        Brand
                                    </Label>
                                <Input id="brand" onChange={(event)=> this.props.handleInput(event.target.value, "brand")}/>                            
                                </div>
                                <div className="col-6"> 
                                    <Label for="Kategori" >
                                        Kategori
                                    </Label>
                                <Input id="kategori" onChange={(event)=> this.props.handleInput(event.target.value, "kategori")}/>                            
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="harga">
                                Harga
                            </Label>
                            <Input id="harga" type="number" onChange={(event)=> this.props.handleInput(event.target.value, "harga")}/>
                        </FormGroup>
                        <FormGroup>
                            <div className="row mb-3">
                                <div className="col-7">
                                    <Label>
                                        Stock
                                    </Label>                            
                                </div>
                                <div className="col-3 float-right">
                                    <Button onClick={this.props.addStock} color="success">Add</Button>
                                </div>   
                            </div>
                        <Row>
                            <Col>
                                {this.props.inputStock.map((input,index)=> 
                                <div className="row">
                                    <Input className="col-3 mx-3 my-1"  placeholder={`type - ${index+1}`} type="text" onChange={(e)=>this.props.stockType(e,index)}/>
                                    <Input className="col-3 mx-3 my-1"  placeholder={`Qty - ${index+1}`} type="number" onChange={(e)=>this.props.stockQty(e,index)}/>
                                    <Button className="col-2 mx-3 my-1" color="danger"outline onClick={()=>this.props.btnDeleteInputStock(index)}>Delete</Button>
                                </div>
                                )}
                            </Col> 
                        </Row>
                        </FormGroup>
                        <FormGroup>
                            <div className="row mb-3">
                                <div className="col-7">
                                    <Label>
                                        Image
                                    </Label>                            
                                </div>
                                <div className="col-3 float-right">
                                    <Button onClick={this.props.addImage} color="success">Add</Button>
                                </div>   
                            </div>
                        <Row>
                            <Col>
                                {this.props.inputImage.map((input,index)=> 
                                <div className="row">
                                    <Input className="col-7 mx-3 my-1" placeholder={`ImgUrl - ${index+1}`} type="text" value={input} onChange={(e)=> this.props.handleImage(e,index)}/>
                                    <Button className="col-2 mx-3 my-1" color="danger"outline onClick={()=>this.props.btnDeleteImage(index)}>Delete</Button>
                                </div>
                                )}
                            </Col> 
                        </Row>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>  
                    <Button type="button" color="primary" onClick={this.props.btnSubmit}>Save</Button>
                    <Button color="warning" onClick={this.props.btCancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            </div> 
         );
    }
}
 
export default ModalInput;