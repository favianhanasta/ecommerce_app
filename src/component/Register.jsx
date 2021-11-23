import React from "react";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container my-4">
                <p className="h4">Silakan Buat akun anda</p>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="text" className="form-control" onChange={(event)=> this.props.handleInput(event.target.value, "userName")} value={this.props.userName}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Email</label>
                        <input type="email" className="form-control" onChange={(event)=> this.props.handleInput(event.target.value, "email")} value={this.props.email}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" onChange={(event)=> this.props.handleInput(event.target.value, "password")} value={this.props.password}/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Confirm Password</label>
                        <input type="password" className="form-control" onChange={(event)=> this.props.handleInput(event.target.value, "confirmPassword")} value={this.props.confirmPassword}/>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary form-control" onClick={this.props.btnDaftar}>Daftar</button>
                    </div>

                    
                </form>

            </div>
         );
    }
}
 
export default Register;