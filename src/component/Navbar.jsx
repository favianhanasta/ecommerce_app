
import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavLink, Collapse, NavItem,Button } from "reactstrap";

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCollapse:false
          }
    }
    render() { 
        return ( 
            <Navbar expand="md">
                <NavbarBrand>
                    <Link to="/" >
                        <img src="https://www.sipayo.com/wp-content/uploads/2017/12/e-commerce.png" alt="logo"
                        width="50px" />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={()=> this.setState({openCollapse: !this.state.openCollapse})}/>
                <Collapse isOpen={this.state.openCollapse} navbar>
                    <Nav>
                        <NavItem>
                            <NavLink>
                                <Link to="productManagement-page" style={{textDecoration:"none"}}>
                                    Products Management
                                </Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Link to="/auth-page" style={{ marginLeft: "auto" }}>
                    <Button  type="button" color="warning" outline>Login dan Daftar</Button>
                    </Link>
                </Collapse>
            </Navbar>
         );
    }
}
 
export default NavbarComponent;