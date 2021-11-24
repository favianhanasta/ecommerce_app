import logo from './logo.svg';
import React from 'react';
import AuthPage from './pages/AuthPage';
import AuthV2 from './pages/AuthV2';
import NavbarComponent from './component/Navbar';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import ProductsManagement from './pages/ProductsManagement';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

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

export default App;