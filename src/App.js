import logo from './logo.svg';
import React from 'react';
import AuthPage from './pages/AuthPage';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
      <div>
        <AuthPage/>
        
      </div>
    )
  }
}

export default App;