import React, {Component} from "react";
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("firstName"  ),
            authenticated: localStorage.getItem("authenticated")
        }
        //this.redirectCheck()
    }
// componentDidMount() {
//         this.setState({
//             authenticated: localStorage.getItem("authenticated")
//         })
// }

    logout = () => {
        axios.get(`http://localhost:8080/logout`)
            .then(response => {
                localStorage.removeItem("firstName")
                localStorage.removeItem("lastName")
                localStorage.removeItem("userId")
                localStorage.removeItem("authenticated");

                this.props.history.push("/");
                window.location.reload();
            }).catch((error) => {
            alert(error)
        });
    };

    redirectCheck = () => {
        if (!localStorage.getItem("authenticated")) {
            return this.props.history.push("/");
        }
    }

    render() {

        const guestLinks = (
            <>
                <div className="mr-auto"/>
                <Nav className="navbar-right">
                    <Link to={"/register"} className="nav-link"><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
                    <Link to={"/login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                </Nav>
            </>
        );

        const userLinks = (
            <>
                <Nav style={{marginRight: 300}} className="ml-auto">
                    <Link to={"/questions"} style={{marginRight: 50}} className="nav-link">Your questions</Link>
                    <Link to={"/answers"} style={{marginRight: 50}} className="nav-link">Answer the question</Link>
                    <NavDropdown title={this.state.username} id="navbarScrollingDropdown">
                        <NavDropdown.Item href={'/edit'}>Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item href={'/delete'}>Delete Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={this.logout }>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </>
        );

        return (
            <Navbar bg="light" variant="light">
                <Link style={{marginLeft: 300}} to={"/"} className="navbar-brand">
                    <img src="https://eclubprague.com/wp-content/uploads/2016/03/qa.png" width="35"
                         alt="brand"/> Question Portal
                </Link>

                {this.state.authenticated ? userLinks : guestLinks}

            </Navbar>
        );
    }
}