import axios from "axios";
import React from "react";
import { ModalTitle } from "react-bootstrap";
import { Container, Table,Button,Modal,ModalHeader} from "reactstrap";
import ModalDetail from "../component/ModalDetail";



class ProductsManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedIdx: null,
            modal:false,
            nama:"",
            dekripsi:"",
            brand:"",
            harga:"",
            stockType:"",
            stockQty:"",
            imgUrl:"",
            imgUrl2:"",
            products:[]
            
            
        }
    }

    componentDidMount(){
        // fungsi yg digunakan untuk melakukan request data pertama kali ke backend
        this.getData();
    }

    getData=()=>{
        axios.get("http://localhost:2000/products")
        .then((response)=>{
            console.log(response.data)
            this.setState({products : response.data})
        })
        .catch((err)=>{console.log(err)})
        
    }
    
    toggle=(idx)=>{
        this.setState({ 
            selectedIdx : idx,
            modal : !this.state.modal
        })
    }

    btnDelete=(idx)=>{
        let id = this.state.products[idx].id
        axios.delete(`http://localhost:2000/products/${id}`)
        .then((response)=>{
            this.getData()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    btnDeleteStock=(idx)=>{
        let id = this.state.products[idx].id
        axios.delete(`http://localhost:2000/products/${id}`)
        .then((response)=>{
            this.getData()
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    btnCancel=()=>{
        this.setState({
            selectedIdx:null,
            modal : false
        })
    }

    handleInput = (value, propState) => {
        this.setState({ [propState]: value })
    }

    printData=()=>{
        return this.state.products.map((value,index)=>{
            return (
                <tr>
                    <td>{index+1}</td>
                    <td><img src={value.images[0]} width="40%"/></td>
                    <td>{value.nama}</td>
                    <td>{value.brand}</td>
                    <td>{value.kategori}</td>
                    <td>IDR {value.harga}</td>
                    <td>
                        <Button type="button" color="primary" className="m-2" outline onClick={()=>this.toggle(index)}>
                            Detail
                        </Button>
                        {
                            this.state.products.length > 0 && this.state.selectedIdx != null ?
                            <ModalDetail
                            produk={this.state.products}
                            selectedId = {this.state.selectedIdx}
                            toggle={this.toggle}
                            modal={this.state.modal}
                            btCancel = {this.btnCancel}
                            handleInput={this.state.handleInput}/>
                            :null

                        }
                        <Button type="button" color="danger" className="m-2" outline onClick={()=>this.btnDelete(index)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        })
    }
    

    render() { 
        return ( 
            <Container>
                <Container className="text-center my-3">
                    <h1> Products Management</h1>
                </Container>
                <Table>
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Product</th>
                            <th>Nama</th>
                            <th>Brand</th>
                            <th>Kategori</th>
                            <th>Harga</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {this.printData()}
                    </tbody>
                </Table>
                


            </Container>
         );
    }
}
 
export default ProductsManagement;