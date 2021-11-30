import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CardImg, CardTitle, Input,Card,CardBody ,Button, Container, ButtonGroup} from "reactstrap";
import { API_URL } from "../helper";



class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            detail:{},
            page: 1
        }
    }

    
    
    printProducts=()=>{
        let {page} = this.state
        return this.props.productsList.slice(page>1? (page-1)*8 :page-1,page*8).map((value,idx)=>{
            return <div className="col-3 mt-2 mb-3">
                <Link to={`/productdetail-page?id=${value.id}`} style={{textDecoration:"none", color:"black"}}>
                <Card className="my-1">
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

    render() { 
        return ( 
            <div className="container pt-4">
                <div className="container">
                    <Container>
                        <p className="h1 font-weight-bold text-center mb-2"> Products </p>
                        <Input type="select" className="my-3"style={{width:"150px",float:"right"}}>
                        <option value="harga-asc">Harga Asc</option>
                        <option value="harga-desc">Harga Desc</option>
                        <option value="nama-asc">A-Z</option>
                        <option value="nama-desc">Z-A</option>
                        <option value="id-asc">Reset</option>
                        </Input>
                    </Container>
                    <Container className="row">
                        {this.printProducts()}
                    </Container>
                    <div className="my-3 text-center">
                        <ButtonGroup>
                            {this.printBtPagination()}
                        </ButtonGroup>
                    </div>
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
export default connect(mapToProps)(ProductsPage);