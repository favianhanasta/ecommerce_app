import logo from './logo.svg';
import React from 'react';
import AuthV2 from './pages/AuthV2';
import NavbarComponent from './component/Navbar';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductsManagement from './pages/ProductsManagement';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginAction,productAction,updateUserCart } from './redux/actions';
import ProductsPage from './pages/ProductsPage';
import { API_URL } from './helper';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        loading : true,
        payment : 0
    }
  }
  componentDidMount(){
    this.keepLogin()
    // this.getProduct()
    this.props.productAction()
  }

  keepLogin= async ()=>{
    try {
      let local=JSON.parse(localStorage.getItem("data"));
      if (local){
        let res= await this.props.loginAction(local.email, local.password)
        if(res.success){
          this.setState({loading:false})
        }
      }else{
        this.setState({ loading : false})
      }

    }catch(error){
      console.log(error)
    }
  }

  

  // getProduct=()=>{
  //   this.props.productAction()
  //   // axios.get(`${API_URL}/products`)
  //   // .then((response)=>{
  //   //   this.props.productAction(response.data)
  //   // })
  //   // .catch((err)=>{
  //   //   console.log(err)
  //   // })
  // }

  
  render(){
    return(
      <div>
        <NavbarComponent
          loading = {this.state.loading}
        />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/auth-page" element={<AuthV2/>}/>
          <Route path="/productManagement-page" element={<ProductsManagement/>}/>
          <Route path="/product-pages" element={<ProductsPage/>}/>
          <Route path="/productdetail-page" element={<ProductDetail/>}/>
          <Route path="/cart-user" element={<CartPage/>} />
        </Routes>
      </div>
    )
  }
}
export default connect(null,{loginAction,productAction,updateUserCart})(App);