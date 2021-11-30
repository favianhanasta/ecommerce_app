import logo from './logo.svg';
import React from 'react';
import AuthV2 from './pages/AuthV2';
import NavbarComponent from './component/Navbar';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductsManagement from './pages/ProductsManagement';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginAction,productAction } from './redux/actions';
import ProductsPage from './pages/ProductsPage';
import { API_URL } from './helper';
import ProductDetail from './pages/ProductDetail';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        loading : true
    }
  }
  componentDidMount(){
    this.keepLogin()
    this.getProduct()
  }

  keepLogin=()=>{
    let local=JSON.parse(localStorage.getItem("data"));
    if (local){
      axios.get(`${API_URL}/dataUser?email=${local.email}&password${local.password}`)
      .then((res)=>{
        console.log("keeplogin", res.data)
        this.setState({ loading : false})
        this.props.loginAction(res.data[0])
      }).catch((err)=>{
        
        
      })
    }else{
      this.setState({ loading : false})
    }
  }

  getProduct=()=>{
    axios.get(`${API_URL}/products`)
    .then((response)=>{
      this.props.productAction(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  
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
        </Routes>
      </div>
    )
  }
}

export default connect(null,{loginAction,productAction})(App);