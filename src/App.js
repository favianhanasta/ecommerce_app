import logo from './logo.svg';
import React from 'react';
import AuthV2 from './pages/AuthV2';
import NavbarComponent from './component/Navbar';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductsManagement from './pages/ProductsManagement';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginAction } from './redux/actions';

const API_URL="http://localhost:2000"

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount(){
    this.keepLogin()
  }

  keepLogin=()=>{
    let local=JSON.parse(localStorage.getItem("data"));
    if (local){

      axios.get(`${API_URL}/dataUser?email=${local.email}&password${local.password}`)
      .then((res)=>{
        console.log("keeplogin", res.data)
        this.props.loginAction(res.data[0])
      }).catch((err)=>{
        
      })
    }
  }

  
  render(){
    return(
      <div>
        <NavbarComponent/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/auth-page" element={<AuthV2/>}/>
          <Route path="/productManagement-page" element={<ProductsManagement/>}/>
        </Routes>
      </div>
    )
  }
}

export default connect(null,{loginAction})(App);