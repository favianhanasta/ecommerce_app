import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container my-4">
                <p className="h4">Silakan Masuk ke akun anda</p>
                <p>Silakan masuk ke akun anda untuk menyelesaikan payment anda</p>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(event)=> this.props.handleInput(event.target.value, "loginEmail")} value={this.props.loginEmail}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(event)=> this.props.handleInput(event.target.value, "loginPassword")} value={this.props.loginPassword}/>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary form-control" onClick={this.props.btnMasuk}>Masuk</button>
                    </div>

                    
                </form>

            </div>
         );
    }
}
 
export default Login;