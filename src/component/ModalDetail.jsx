import React from "react";
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader,Form, ModalFooter} from "reactstrap";


class ModalDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            disable: true,
            btn : "Edit"
         }
    }

    btnEdit=()=>{
        this.setState({
            disable: false,
            btn : "Save"
        })
    }



    render() { 
        return (
            <div>
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.btCancel}>
                    Detail Product
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="nama">
                                Nama
                            </Label>
                            <Input id="nama" defaultValue={this.props.produk[this.props.selectedId].nama} disabled={this.state.disable}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="deskripsi">
                                Deskripsi
                            </Label>
                            <Input id="deskripsi" type="textarea" defaultValue={this.props.produk[this.props.selectedId].deskripsi} disabled={this.state.disable}/>
                        </FormGroup>
                        <FormGroup>
                            <div className="row">
                                <div className="col-6"> 
                                    <Label for="brand">
                                        Brand
                                    </Label>
                                <Input id="brand" defaultValue={this.props.produk[this.props.selectedId].brand} disabled={this.state.disable}/>                            
                                </div>
                                <div className="col-6"> 
                                    <Label for="Kategori" >
                                        Kategori
                                    </Label>
                                <Input id="kategori" defaultValue={this.props.produk[this.props.selectedId].kategori} disabled={this.state.disable}/>                            
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="harga">
                                Harga
                            </Label>
                            <Input id="harga" type="number" defaultValue={this.props.produk[this.props.selectedId].harga} disabled={this.state.disable}/>
                        </FormGroup>
                        <FormGroup>
                            <div className="row">
                                    <Label>
                                        Stock
                                    </Label>
                                <div className="col-4"> 
                                    <Input defaultValue={this.props.produk[this.props.selectedId].stock[0].type} disabled={this.state.disable}/>                            
                                    <Input defaultValue={this.props.produk[this.props.selectedId].stock[1].type} disabled={this.state.disable}/>                            
                                </div>
                                <div className="col-4"> 
                                    <Input type="number" defaultValue={this.props.produk[this.props.selectedId].stock[0].qty} disabled={this.state.disable}/>                            
                                    <Input type="number" defaultValue={this.props.produk[this.props.selectedId].stock[1].qty} disabled={this.state.disable}/>                            
                                </div>
                                <div className="col-4">
                                    <Button  type="button" color="danger" outline>
                                        Delete
                                    </Button>                                                                                           
                                    <Button  type="button" color="danger" outline>
                                        Delete
                                    </Button>                   
                                                        
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="images">
                                Image(URL)
                            </Label>
                            <Input type="text" className="mb-1" defaultValue={this.props.produk[this.props.selectedId].images[0]} disabled={this.state.disable}/>
                            <Input type="text" defaultValue={this.props.produk[this.props.selectedId].images[1]} disabled={this.state.disable}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.btnEdit}>
                        {this.state.btn}
                    </Button>
                    <Button color="warning" onClick={this.props.btCancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            </div> 
         );
    }
}
 
export default ModalDetail;