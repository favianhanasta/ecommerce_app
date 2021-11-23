import axios from "axios";
import React from "react";
import Login from "../component/Login";
import Register from "../component/Register";

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:"",
            email:"",
            password:"",
            confirmPassword:"" ,
            loginEmail:"",
            loginPassword:"",
            dataUser:[]
         }
    }
    
    componentDidMount(){
        this.getData()
    }

    getData=()=>{
        axios.get(`http://localhost:2000/dataUser`)
        .then((response)=>{
            this.setState({dataUser:response.data})
        })
        .catch((err)=>{console.log(err)})
    }

    handleInput = (value,propState)=>{
        this.setState({[propState]:value})
    }

    btnDaftar =()=>{
        let {userName,email,password,confirmPassword,dataUser} = this.state;
        if(password === confirmPassword){
            axios.post(`http://localhost:2000/dataUser`,{
                userName,
                email,
                password,
                role:"user"
            }).then((response)=>{
                this.getData()
                this.setState({
                    userName:"",
                    email:"",
                    password:"",
                    confirmPassword:""
                })
                alert (`Berhasil Terdaftar!`)
            })
            .catch((err)=>{console.log(err)})
        }else{
            alert("Register Gagal Mohon cek Kembali data Anda")
        }
    }

    btnMasuk =()=>{
        let {dataUser,loginEmail,loginPassword} = this.state;
        console.log(dataUser.length)
        let index=null;
        for(let i=0;i<dataUser.length;i++){
            if(dataUser[i].email===loginEmail && dataUser[i].password===loginPassword){
                index = i
            }
        }
        if(index!=null){
            alert(`${dataUser[index].userName}, Login Berhasil`)
            this.setState({
                loginEmail:"",
                loginPassword:"",   
            })
        }else{
            alert("Login Gagal")
        }
    }

    

    render() { 
        return ( 
            <div className="container-fluid">
                <div id="title" className="text-center my-4">
                    <h1>Pilihan Masuk</h1>
                    <p className="lead">Masuk dan selesaikan dengan data pribadi Anda atau Daftar untuk menikmati semua manfaat memiliki akun IKEA</p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Login
                            loginEmail={this.state.loginEmail}
                            loginPassword={this.state.loginPassword}
                            btnMasuk={this.btnMasuk}
                            handleInput={this.handleInput}
                            />
                        </div>
                        <div className="col-6">
                            <Register
                            handleInput={this.handleInput}
                            btnDaftar={this.btnDaftar}
                            userName={this.state.userName}
                            email={this.state.email}
                            password={this.state.password}
                            confirmPassword={this.state.confirmPassword}
                            />
                        </div>

                    </div>

                </div>

            </div>
         );
    }
}
 
export default LoginRegister;