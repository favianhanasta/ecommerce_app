import axios from "axios";
import React from "react";
import { Container, Table,Button,Modal,ModalHeader, Input,Col,Row,ButtonGroup, InputGroupText, Label,Form,FormGroup} from "reactstrap";
import ModalDetail from "../component/ModalDetail";
import {productAction,sortAction} from '../redux/actions'
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
            selectedIdImage : null,
            page:1,
            handle : 4,
            detailProduk:{}
            
            
        }
    }

    componentDidMount(){
        this.props.productAction()
    }

    // getData=()=>{
    //     axios.get(`${API_URL}/products`)
    //     .then((response)=>{
    //         console.log(response.data)
    //         this.setState({products : response.data})
    //         console.log("Response GetData->",response.data)
    //         this.props.productAction(response.data[0])
    //     })
    //     .catch((err)=>{console.log(err)})
        
    // }
    
    toggle=(value)=>{
        console.log("tst data",this.state.detailProduk)
        this.setState({ 
            detailProduk:value,
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
        let id = this.props.productsList[idx].id
        axios.delete(`${API_URL}/products/${id}`)
        .then((response)=>{
            this.props.productAction()
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
            modal : false
        })
    }

    handleInput = (value, propState) => {
        this.setState({ [propState]: value })
    
    }
    
    printData=()=>{
        let {page,handle}=this.state
        return this.props.productsList.slice(page>1? (page-1)*handle :page-1,page*handle).map((value,index)=>{
            return (
                <tr>
                    <td>{page > 1 ? (page - 1) * handle + index + 1 : index + 1}</td>
                    <td>
                        {
                            this.state.selectedIdImage==index?
                            <img src={value.images[this.state.thumbnailIdx]} width="50%"/>
                            :
                            <img src={value.images[0]} width="50%"/>
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
                    <td>IDR {value.harga.toLocaleString()}</td>
                    <td>
                        <Button type="button" color="primary" className="m-2" outline onClick={()=>this.setState({ detailProduk:value,modal : !this.state.modal})}>
                            Detail
                        </Button>
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
    
    btnPagination = () =>{
        let btn =[]
        for(let i=0;i< Math.ceil(this.props.productsList.length/this.state.handle);i++){
            btn.push(<Button outline color="primary"
            disabled={this.state.page=== i + 1 ? true : false} 
            onClick={()=>this.setState({page: i+1})}>{i+1}</Button>)
        }
        return btn;
    }
    
    handlePage =(e)=>{
        this.setState({handle: parseInt(e.target.value),page:1})
        console.log("tst value",e.target.value)
    }

    btSearch=()=>{
        this.props.productAction(this.inSearchName.value,this.hargaMin.value,this.hargaMax.value)
        this.setState({page:1})
    }

    btReset =()=>{
        this.props.productAction()
        this.props.sortAction()
        this.inSearchName.value=""
        this.hargaMin.value=null
        this.hargaMax.value=null
    }
    handleSort =(e)=>{
        this.props.sortAction({
            field : e.target.value.split('-')[0],
            sortType : e.target.value.split('-')[1]
        })
    }
    
    render() {
        console.log("test",this.state.detailProduk)
        return ( 
            <div className="container-fluid">
                <ModalDetail
                    produk={this.state.detailProduk}
                    selectedId = {this.state.selectedIdx}
                    toggle={this.toggle}
                    modal={this.state.modal}
                    btCancel = {this.btnCancel}
                    handleInput={this.handleInput}
                    />
                <Container className="my-3 text-center">
                    <h1> Products Management</h1>
                </Container>
                <div className="row">
                    <div className="col-12 col-md-4">
                                <FormGroup>
                                <Button  color="success" style={{width:"100%"}}    onClick={this.toggleInput}>
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
                                </FormGroup>
                            <div className="d-flex d-md-block">
                                <FormGroup>
                                    <Label for="cari-nama">Nama</Label>
                                    <Input id="cari-nama" type="text" innerRef={(element)=> this.inSearchName=element}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="harga-min">Harga</Label>
                                    <div className="d-flex">
                                    <Input id="harga-min"  type="number" placeholder="Minimum" innerRef={(element)=> this.hargaMin=element}/>
                                    <Input id="harga-max"  type="number" placeholder="Maximum" innerRef={(element)=> this.hargaMax=element}/>                                    
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="sort">Sort</Label>
                                <Input id="sort"type="select" className=""onChange={this.handleSort}>  
                                    <option value="harga-asc">Harga Asc</option>
                                    <option value="harga-desc">Harga Desc</option>
                                    <option value="nama-asc">A-Z</option>
                                    <option value="nama-desc">Z-A</option>
                                    <option value="id-asc">Reset</option>
                                </Input>
                                <FormGroup className="d-flex justify-content-end my-3">
                            <Button outline color="warning" className="mx-2" onClick={this.btReset}>Reset</Button>
                                <Button color="primary" onClick={this.btSearch} >Search</Button>
                                </FormGroup>
                                </FormGroup>
                                </div>
                    </div>
                    <div className="col-12 col-md-8">
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
                <div>
                <div className="m-3 d-flex">
                    <Input type="select" style={{width:"100px"}} onChange={this.handlePage}>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                    </Input>
                    <ButtonGroup className="mx-3">
                        {this.btnPagination()}
                    </ButtonGroup>
                </div>
                </div>
                    
                </div>
                </div>
                


            </div>
         );
    }
}
 
const mapToProps=((state)=>{
    return {
        productsList: state.productsReducer.productsList
    }
})

export default connect(mapToProps,{productAction,sortAction})(ProductsManagement);