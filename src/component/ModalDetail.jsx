import React from "react";
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader,Form, ModalFooter,Row,Col} from "reactstrap";


class ModalDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            disable: false,
            btn : "Edit"
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
                            <Input disabled={!this.state.disable} type="text" defaultValue={item.type}/>
                        </Col>
                        <Col>
                            <Input disabled={!this.state.disable} type="number" defaultValue={item.qty}/>
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
                return <Input disabled={!this.state.disable} type="text" defaultValue={item} placeholder={`Images-${index + 1}`} onChange={(e) => this.handleImages(e, index)} />
            })
        }
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
                            <Input id="nama" defaultValue={this.props.produk[this.props.selectedId].nama} disabled={!this.state.disable}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="deskripsi">
                                Deskripsi
                            </Label>
                            <Input id="deskripsi" type="textarea" defaultValue={this.props.produk[this.props.selectedId].deskripsi} disabled={!this.state.disable}/>
                        </FormGroup>
                        <FormGroup>
                            <div className="row">
                                <div className="col-6"> 
                                    <Label for="brand">
                                        Brand
                                    </Label>
                                <Input id="brand" defaultValue={this.props.produk[this.props.selectedId].brand} disabled={!this.state.disable}/>                            
                                </div>
                                <div className="col-6"> 
                                    <Label for="Kategori" >
                                        Kategori
                                    </Label>
                                <Input id="kategori" defaultValue={this.props.produk[this.props.selectedId].kategori} disabled={!this.state.disable}/>                            
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="harga">
                                Harga
                            </Label>
                            <Input id="harga" type="number" defaultValue={this.props.produk[this.props.selectedId].harga} disabled={!this.state.disable}/>
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
                            <Button type="button" color="primary">Save</Button>
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
 
export default ModalDetail;