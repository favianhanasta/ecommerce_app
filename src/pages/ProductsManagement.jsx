import axios from "axios";
import React from "react";
import { Container, Table,Button,Modal,ModalHeader, Input,Col,Row} from "reactstrap";
import ModalDetail from "../component/ModalDetail";
import {productAction} from '../redux/actions'
import {connect} from 'react-redux'
import ModalInput from "../component/ModalInput";
import NavItem from "@restart/ui/esm/NavItem";
import { API_URL } from "../helper";




class ProductsManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedIdx: null,
            modal:false,
            modalInput:false,
            nama:"",
            deskripsi:"",
            brand:"",
            harga:null,
            stock:[
                {
                    stockType:"",
                    stockQty : null
                }
            ],
            images:[],
            inputImage:[],
            inputStock:[],
            products:[],
            stock:[],
            thumbnailIdx : 0,
            selectedIdImage : null
            
            
        }
    }

    componentDidMount(){
        // fungsi yg digunakan untuk melakukan request data pertama kali ke backend
        this.getData();
    }

    getData=()=>{
        axios.get(`${API_URL}/products`)
        .then((response)=>{
            console.log(response.data)
            this.setState({products : response.data})
            console.log("Response GetData->",response.data)
            this.props.productAction(response.data[0])
        })
        .catch((err)=>{console.log(err)})
        
    }
    
    toggle=(idx)=>{
        this.setState({ 
            selectedIdx : idx,
            modal : !this.state.modal
        })
    }

    toggleInput=()=>{
        this.setState({
            modalInput : !this.state.modalInput,
            inputImage : []
        })
    }

    btnDelete=(idx)=>{
        let id = this.state.products[idx].id
        axios.delete(`${API_URL}/products/${id}`)
        .then((response)=>{
            this.getData()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    btnDeleteStock=(idx)=>{
        let id = this.state.products[idx].id
        axios.delete(`${API_URL}/products/${id}`)
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
                    <td>
                        {
                            this.state.selectedIdImage==index?
                            <img src={value.images[this.state.thumbnailIdx]} width="40%"/>
                            :
                            <img src={value.images[0]} width="40%"/>
                        }
                        <div>
                            {value.images.map((val,idx)=>{
                                return <img src={val} className="my-2" style={{cursor:"pointer"}} width="15%" alt={value.nama+index} onClick={()=>this.setState({thumbnailIdx:idx,selectedIdImage:index})}/>
                            })

                            }
                        </div>
                    </td>
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
                            handleInput={this.handleInput}
                            paramImg={this.paramImg}/>
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
    
    btnSubmit=()=>{
        let {nama,deskripsi,brand,kategori,harga,stock,images} = this.state
        if(nama==""||deskripsi==""||brand==""||kategori==""||harga==null||stock.length==0||images.length==0){
            alert("Lengkapi data anda")
        }else{
            axios.post(`${API_URL}/products`,{
                nama : this.state.nama,
                deskripsi : this.state.deskripsi,
                brand : this.state.brand,
                kategori: this.state.kategori,
                harga : this.state.harga,
                stock : this.state.inputStock,
                images : this.state.inputImage,
            })
            .then((response)=>{
                this.getData()
                
            })
        } 
    }
    
    addImage =()=>{
        let newInput = ``
        this.setState(({inputImage: this.state.inputImage.concat([newInput])}))
        console.log(this.state.inputImage)
    }
    
    addStock =()=>{
        let newStock = {
            id:null,
            type:"",
            qty:null
        }
        this.setState(({inputStock: this.state.inputStock.concat([newStock])}))
    }

    btnDeleteImage =(idx)=>{
        let inputImage=this.state.inputImage
        inputImage.splice(idx,1)
        console.log(inputImage)
        this.setState({inputImage})
    }
    
    handleImage=(e,index)=>{
        const value= e.target.value
        console.log(value)
        console.log(index)
        let temp=[...this.state.inputImage]
        temp[index]=value
        this.setState({
            inputImage : temp
        })
    }
    
    stockType = (e,index) =>{
        const value=e.target.value
        let temp=[...this.state.inputStock]
        temp[index].type=value
        this.setState({inputStock:temp})
    }
    stockQty = (e,index) =>{
        const value=e.target.value
        let temp=[...this.state.inputStock]
        temp[index].qty=value
        this.setState({inputStock:temp})
    }
    btnDeleteInputStock =(idx)=>{
        let inputStock=this.state.inputStock
        inputStock.splice(idx,1)
        this.setState({inputStock})
    }
    
    
    
    render() {
        return ( 
            <Container>
                <Container className=" text-center my-3">
                    <h1> Products Management</h1>
                </Container>
                <div>
                    <div>
                        <Container className="my-2 d-flex justify-content-end">
                        <Button onClick={this.toggleInput} color="success">
                            Add Product
                        </Button>
                        <ModalInput
                        toggleInput={this.toggleInput}
                        modalInput={this.state.modalInput}
                        handleInput={this.handleInput}
                        handleImage={this.handleImage}
                        btnSubmit={this.btnSubmit}
                        addImage={this.addImage}
                        addStock={this.addStock}
                        stockQty={this.stockQty}
                        stockType={this.stockType}
                        inputImage={this.state.inputImage}
                        inputStock={this.state.inputStock}
                        btnDeleteImage={this.btnDeleteImage}
                        btnDeleteInputStock={this.btnDeleteInputStock}
                        />
                        </Container>
                    
                    </div>
                    <div className="col-12">
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
                    
                </div>
                </div>
                


            </Container>
         );
    }
}
 
export default connect(null,{productAction})(ProductsManagement);