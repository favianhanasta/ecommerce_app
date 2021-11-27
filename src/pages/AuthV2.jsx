import React from 'react';
import axios from 'axios';
import { Button, Container, FormGroup, Input, InputGroup, InputGroupText, Label, Toast, ToastBody, ToastHeader } from 'reactstrap';
import {loginAction} from '../redux/actions'
import {connect} from 'react-redux'
import { Navigate } from 'react-router';
const API_URL = "http://localhost:2000"

class AuthV2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            logPassShow: "Show",
            logPassType: "password",
            regPassShow: "Show",
            regPassType: "password",
            toastOpen: false,
            toastHeader:"",
            toastBody:"",
            toastIcon:""
        }
    }

    handleInput = (value, propState) => {
        this.setState({ [propState]: value })
    }

    btLogin = () => {
        // alert(`${this.state.email}, ${this.passwordLogin.value}`)

        axios.get(`${API_URL}/dataUser?email=${this.state.email}&password=${this.passwordLogin.value}`)
            .then((response) => {
                console.log("Response Login ->",response.data)
                localStorage.setItem("data", JSON.stringify(response.data[0]))
                this.props.loginAction(response.data[0])
            }).catch((err) => {
                console.log(err)
            })
    }

    btRegis=()=>{
        if(this.usernameRegis.value==""|| this.emailRegis.value==""||this.passwordRegis.value==""||this.confPasswordRegis==""){
            this.setState({
                toastOpen:true,
                toastHeader:"Register Warning",
                toastIcon:"warning",
                toastBody:"Isi semua form"
            })
        }else{
            if(this.passwordRegis.value==this.confPasswordRegis.value){
                if(this.emailRegis.value.includes("@")){
                    axios.post(`${API_URL}/dataUser`,{
                        username:this.usernameRegis.value,
                        email:this.emailRegis.value,
                        password:this.passwordRegis.value,
                        role:"user",
                        status:"Active"
                    }).then((response)=>{
                        this.setState({
                            toastOpen:true,
                            toastHeader:"Register Status",
                            toastIcon:"success",
                            toastBody:"Registrasi Berhasil"
                        })
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                    this.setState({
                        toastOpen:true,
                        toastHeader:"Register Warning",
                        toastIcon:"warning",
                        toastBody:"Email Salah"
                    })
                }
            }else{
                this.setState({
                    toastOpen:true,
                    toastHeader:"Register Warning",
                    toastIcon:"warning",
                    toastBody:"Password Salah"
                })
            }
        }
    }

    btShowPassLogin = () => {
        if (this.state.logPassType == "password") {
            this.setState({
                logPassShow: "Hide",
                logPassType: "text"
            })
        } else {
            this.setState({
                logPassShow: "Show",
                logPassType: "password"
            })
        }
    }

    btShowPassRegis = () => {
        if (this.state.regPassType == "password") {
            this.setState({
                regPassShow: "Hide",
                regPassType: "text"
            })
        } else {
            this.setState({
                regPassShow: "Show",
                regPassType: "password"
            })
        }
    }

    render() {
        if(this.props.iduser){
            return<Navigate to="/"/>   
        }
        return (
            <Container className="p-5">
                <div>
                <Toast isOpen={this.state.toastOpen} style={{position:"fixed"}}>
                    <ToastHeader icon={this.state.toastIcon} toggle={()=>this.setState({toastOpen:false})}>
                        {this.state.toastHeader}
                    </ToastHeader>
                    <ToastBody>
                        {this.state.toastBody}
                    </ToastBody>
                </Toast>
                </div>
                <h2 style={{ fontWeight: "bold", textAlign: "center" }}>Pilihan Masuk</h2>
                <p className="text-center">Masuk dan selesaikan pesanan dengan data diri anda atau daftar untuk menikmati semua layanan</p>
                <div className="row">
                    <div className="col-6 p-5">
                        <h3 className="text-center py-3">Silahkan masuk ke akun anda</h3>
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="text" id="textEmail" placeholder="Masukkan Email Anda"
                                onChange={(event) => this.handleInput(event.target.value, "email")} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Password</Label>
                            <InputGroup>
                                <Input type={this.state.logPassType} id="textPassword" placeholder="Masukkan Password Anda"
                                    innerRef={(element) => this.passwordLogin = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassLogin}>
                                    {this.state.logPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <Button color="primary" style={{ width: "100%" }} onClick={this.btLogin}>Masuk</Button>
                    </div>
                    <div className="col-6 p-5">
                        <h3 className="text-center py-3">Silahkan buat akun anda</h3>
                        <FormGroup>
                            <Label for="textUsername">Username</Label>
                            <Input type="text" id="textUsername" placeholder="Masukkan Username Anda"
                                innerRef={(element) => this.usernameRegis = element} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="text" id="textEmail" placeholder="Masukkan Email Anda"
                                innerRef={(element) => this.emailRegis = element} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Password</Label>
                            <InputGroup>
                                <Input type={this.state.regPassType} id="textPassword" placeholder="Masukkan Password Anda"
                                    innerRef={(element) => this.passwordRegis = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassRegis}>
                                    {this.state.regPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Konfirmasi Password</Label>
                            <InputGroup>
                                <Input type={this.state.regPassType} id="textPassword" placeholder="Konfirmasi Password Anda"
                                    innerRef={(element) => this.confPasswordRegis = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassRegis}>
                                    {this.state.regPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <Button color="primary" style={{ width: "100%" }} onClick={this.btRegis}>Daftar</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapToProps =(state)=>{
    return{
        iduser : state.userReducer.id
    }
}

export default connect(mapToProps,{loginAction})(AuthV2);