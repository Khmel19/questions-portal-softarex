import React, {Component} from "react";
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Unknown"
        }
    }

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Link style={{marginLeft: 300}} to={"/"} className="navbar-brand">
                    <img src="https://eclubprague.com/wp-content/uploads/2016/03/qa.png" width="35"
                         alt="brand"/> Question Portal
                </Link>
                <Nav style={{marginRight: 300}} className="ml-auto">
                    <Link to={"/questions"} style={{marginRight: 50}} className="nav-link">Your questions</Link>
                    <Link to={"/answers"} style={{marginRight: 50}} className="nav-link">Answer the question</Link>
                    <NavDropdown title={this.state.username} id="navbarScrollingDropdown">
                        <NavDropdown.Item>
                            <Link to={"/alalalong"} className="nav-link">Action</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

            </Navbar>
        );
    }
}