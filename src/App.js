import logo from './logo.svg';
import React from 'react';
import LoginRegister from './pages/LoginRegister';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
      <div>
        <LoginRegister/>
        
      </div>
    )
  }
}

export default App;