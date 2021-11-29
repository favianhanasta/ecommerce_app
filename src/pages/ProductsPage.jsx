import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CardImg, CardTitle, Input,Card,CardBody ,Button} from "reactstrap";
import { API_URL } from "../helper";



class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            detail:{},
        }
    }

    
    
    printProducts=()=>{
        return this.props.productsList.map((value,idx)=>{
            return <div className="col-3 mt-2">
                <Link to={`/productdetail-page?id=${value.id}`} style={{textDecoration:"none", color:"black"}}>
                <Card>
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


    render() { 
        return ( 
            <div className="container">
                <Input type="select" style={{width:"150px",float:"right"}}>
                    <option value="harga-asc">Harga Asc</option>
                    <option value="harga-desc">Harga Desc</option>
                    <option value="nama-asc">A-Z</option>
                    <option value="nama-desc">Z-A</option>
                    <option value="id-asc">Reset</option>
                
                
                </Input>
                <div className="cotainer row">
                    {this.printProducts()}
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