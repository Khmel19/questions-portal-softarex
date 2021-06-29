import React, {Component} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("firstName"),
            authenticated: localStorage.getItem("authenticated")
        }
        this.redirectCheck()
    }

    logout = () => {
        axios.get(`http://localhost:8080/api/logout`)
            .then(response => {
                localStorage.removeItem("firstName")
                localStorage.removeItem("lastName")
                localStorage.removeItem("userId")
                localStorage.removeItem("authenticated");

                window.location.reload();
            }).catch((error) => {
            console.log(error)
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
                <Nav className="navbar-right" style={{marginRight: 50}}>
                    <Link to={"/registration"} style={{marginRight: 10}} className="nav-link"><FontAwesomeIcon
                        icon={faUserPlus}/> Registration</Link>
                    <Link to={"/login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                </Nav>
            </>
        );

        const userLinks = (
            <>
                <Nav style={{marginRight: 100}} className="ml-auto">
                    <Link to={"/questions"} style={{marginRight: 50}} className="nav-link">Your questions</Link>
                    <Link to={"/answers"} style={{marginRight: 50}} className="nav-link">Answer the question</Link>
                    <NavDropdown title={this.state.username} id="navbarScrollingDropdown">
                        <NavDropdown.Item href={'/edit'}>Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item href={'/delete'}>Delete Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </>
        );

        return (
            <Navbar bg="light" variant="light">
                <Link style={{marginLeft: 250}} to={"/"} className="navbar-brand">
                    <img src="https://eclubprague.com/wp-content/uploads/2016/03/qa.png" width="35"
                         alt="brand"/> Question Portal
                </Link>

                {this.state.authenticated ? userLinks : guestLinks}

            </Navbar>
        );
    }
}

export default withRouter(NavigationBar);