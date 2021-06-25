import React, {Component} from 'react';
import {Row, Col, Card, Form, InputGroup, FormControl, Button, Alert} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faEnvelope, faLock, faUndo} from "@fortawesome/free-solid-svg-icons";
// const axios = window.axios
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.redirectCheck()
    }

    initialState = {
        email: '',
        password: ''
    };
    redirectCheck = () => {
        if (localStorage.getItem("authenticated")) {
            return this.props.history.push("/");
        }
    }
    credentialChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    validateUser = () => {
        axios.post(`http://localhost:8080/login`, this.state)
            .then(response => {
                localStorage.setItem("firstName", response.data.firstName)
                localStorage.setItem("lastName", response.data.lastName)
                localStorage.setItem("userId", response.data.id)
                localStorage.setItem("authenticated", true);
                 window.location.reload();
                //return this.props.history.push("/");
            }).catch((error) => {
            alert(error)
        });

        // this.props.authenticateUser(this.state.email, this.state.password);
        // setTimeout(() => {
        //     if(this.props.auth.isLoggedIn) {
        //         return this.props.history.push("/");
        //     } else {
        //         this.resetLoginForm();
        //         this.setState({"error":"Invalid email and password"});
        //     }
        // }, 500);
    };

    resetLoginForm = () => {
        localStorage.removeItem("firstName")
        localStorage.removeItem("lastName")
        localStorage.removeItem("userId")
        localStorage.removeItem("authenticated");
        this.setState(() => this.initialState);
    };

    render() {
        const {email, password, error} = this.state;

        return (
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Card className={"border border-dark bg-white text-dark"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="text" name="email" value={email}
                                                     onChange={this.credentialChange}
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
                                                     value={password} onChange={this.credentialChange}
                                                     className={"bg-white text-dark"} placeholder="Enter Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{textAlign: "right"}}>
                            <Button size="sm" type="button" variant="primary" onClick={() => {console.log(1);this.validateUser()}}
                                    disabled={email === '' || password === ''}>
                                <FontAwesomeIcon icon={faSignInAlt}/> Login
                            </Button>
                            <Button size="sm" type="button" variant="danger" onClick={this.resetLoginForm}
                                    disabled={email === '' && password === ''}>
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
    }
}


export default Login;