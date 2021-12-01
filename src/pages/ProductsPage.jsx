import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CardImg, CardTitle, Input,Card,CardBody ,Button, Container, ButtonGroup, InputGroup, InputGroupText, Label} from "reactstrap";
import { API_URL } from "../helper";
import {productAction,sortAction} from '../redux/actions'


class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            detail:{},
            page: 1,
            hargaAsc: false,
            hargaDsc: false,
            namaAsc: false,
            namaDsc: false,
            reset: false,
        }
    }

    
    
    printProducts=()=>{
        let {page} = this.state
        return this.props.productsList.slice(page>1? (page-1)*8 :page-1,page*8).map((value,idx)=>{
            return <div className="col-3 mt-2 mb-3">
                <Link to={`/productdetail-page?id=${value.id}`} style={{textDecoration:"none", color:"black"}}>
                <Card className="my-1 shadow bg-white rounded">
                    <CardImg top width="100%"alt={`${value.nama}-${idx}`} src={value.images[0]}/>
                    <CardBody>
                        <CardTitle tag="h5" style={{fontWeight:"bolder"}}> {value.nama} </CardTitle>
                        <CardTitle tag="h6" style={{fontWeight:"bold"}}> IDR {value.harga.toLocaleString()} </CardTitle>
                    </CardBody>
                </Card>
                </Link>
            </div>
        })
    }

    printBtPagination = () =>{
        let btn=[]
        for(let i=0;i< Math.ceil(this.props.productsList.length/8);i++){
            btn.push(<Button outline color="primary"
            disabled={this.state.page=== i + 1 ? true : false} 
            onClick={()=>this.setState({page: i+1})}>{i+1}</Button>)
        }
        return btn;
    }

    btSeacrh=()=>{
        this.props.productAction(this.inSearchName.value,this.hargaMin.value,this.hargaMax.value)
        this.setState({page:1})
    }

    btReset =()=>{
        this.props.productAction()
        this.props.sortAction()
        this.inSearchName.value=""
        this.hargaMin.value=null
        this.hargaMax.value=null
        this.sortInput.value="harga-asc"
    }

    btnSort =()=>{
        if(this.sortInput.value=="harga-asc"){
            this.props.sortAction({
                hargaAsc : this.sortInput.value
            })
        }
        else if(this.sortInput.value=="harga-desc"){
            this.props.sortAction({
                hargaDsc : this.sortInput.value
            })
        }
        else if(this.sortInput.value=="nama-asc"){
            this.props.sortAction({
                namaAsc : this.sortInput.value
            })
        }
        else if(this.sortInput.value=="nama-desc"){
            this.props.sortAction({
                namaDsc : this.sortInput.value
            })
        }else{
            this.props.sortAction()
            this.sortInput.value="harga-asc"
        }
        this.setState({page:1})
    }

    render() { 
        return ( 
                <div className="container pt-3 ">
                    <p className="h1 font-weight-bold text-center mb-2"> Products </p>
                    <div className="container shadow bg-white rounded p-2 mt-3">
                    <div className="container row align-content-center">
                        <div className="col-4 m-auto "> 
                            <Label for="input-produk">Nama</Label>  
                            <Input id="input-produk" placeholder="Cari Produk" innerRef={(element)=> this.inSearchName=element} type="text" style={{width:"250px"}}/>   
                            
                        </div>
                        <div className="col-4 m-auto" >
                            <Label for="inputMax">Harga</Label>
                            <div className="d-flex">
                            <Input id="inputMax" placeholder="Minimum" innerRef={(element)=> this.hargaMin=element} type="number" style={{width:"150px"}}/>
                            <Input id="inputMax" placeholder="Maksimum" innerRef={(element)=> this.hargaMax=element} type="number" style={{width:"150px"}}/>
                            </div>
                        </div>
                        <div className="col-4 m-auto ">
                            <Label for="sort">Sort</Label>
                            <InputGroup className="d-flex">
                            <Input id="sort"type="select" className=""style={{width:"150px"}} innerRef={(element)=>this.sortInput=element}>
                            <option value="harga-asc">Harga Asc</option>
                            <option value="harga-desc">Harga Desc</option>
                            <option value="nama-asc">A-Z</option>
                            <option value="nama-desc">Z-A</option>
                            <option value="id-asc">Reset</option>
                            </Input>
                            <InputGroupText onClick={this.btnSort} style={{cursor:"pointer"}}>Sort</InputGroupText>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="row m-2 d-flex justify-content-end">
                        <div className="col-2 d-flex">
                        <Button outline color="warning" className="mx-2" onClick={this.btReset}>Reset</Button>
                        <Button color="primary" onClick={this.btSeacrh}>Search</Button>
                        </div>
                    </div>
                    </div>
                    <div className="container row mt-3">
                        {this.printProducts()}
                    </div>
                    <div className="m-3 text-center p-2">
                        <ButtonGroup>
                            {this.printBtPagination()}
                        </ButtonGroup>
                    </div>
                </div>
         );
    }
}
 
const mapToProps=({productsReducer})=>{
    console.table(productsReducer.productsList)
    return {
        productsList: productsReducer.productsList
    }
}
export default connect(mapToProps,{productAction,sortAction})(ProductsPage);