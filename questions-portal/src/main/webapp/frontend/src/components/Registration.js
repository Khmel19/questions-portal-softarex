import React, {Component} from 'react';
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.redirectCheck()
    }

    initialState = {
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        lastName: ''
    };

    registerUser = () => {
        if (this.state.confirmPassword === this.state.password) {
            axios.post(`http://localhost:8080/registration`, this.state)
                .then(response => {
                    localStorage.setItem("firstName", response.data.firstName)
                    localStorage.setItem("lastName", response.data.lastName)
                    localStorage.setItem("userId", response.data.id)
                    localStorage.setItem("authenticated", true);
                    window.location.reload();
                }).catch((error) => {
                alert("Account with this email already exists")
            });
        } else {
            alert("Password mismatch")
        }
    };

    redirectCheck = () => {
        if (localStorage.getItem("authenticated")) {
            return this.props.history.push("/");
        }
    }

    userChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    resetRegisterForm = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const {firstName, email, password, phoneNumber, confirmPassword, lastName} = this.state;

        return (
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    <Card className={"border border-dark bg-white text-dark"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faUserPlus}/> Registration
                        </Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="email" name="email" value={email}
                                                     onChange={this.userChange}
                                                     className={"bg-white text-dark"}
                                                     placeholder="Enter Email Address"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="password" name="password"
                                                     value={password} onChange={this.userChange}
                                                     className={"bg-white text-dark"} placeholder="Enter Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="password" name="confirmPassword"
                                                     value={confirmPassword} onChange={this.userChange}
                                                     className={"bg-white text-dark"} placeholder="Confirm Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required
                                                     autoComplete="off" type="text" name="firstName" value={firstName}
                                                     onChange={this.userChange}
                                                     className={"bg-white text-dark"} placeholder="Enter First Name"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="text" name="lastName" value={lastName}
                                                     onChange={this.userChange}
                                                     className={"bg-white text-dark"} placeholder="Enter Last Name"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faPhone}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="text" name="phoneNumber" value={phoneNumber}
                                                     onChange={this.userChange}
                                                     className={"bg-white text-dark"}
                                                     placeholder="Enter Contact Number"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{textAlign: "right"}}>
                            <Button size="sm" type="button" variant="primary"
                                    onClick={this.registerUser}
                                    disabled={this.state.email.length === 0 || this.state.password.length === 0
                                    || this.state.confirmPassword.length === 0 || this.state.firstName.length === 0}>
                                <FontAwesomeIcon icon={faUserPlus}/> Register
                            </Button>{' '}
                            <Button size="sm" type="button" variant="danger" onClick={this.resetRegisterForm}>
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
    }
}