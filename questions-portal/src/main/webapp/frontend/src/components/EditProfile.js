import React, {Component} from 'react';
import {Button, Card, Col, Form, FormControl, InputGroup, Row} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.findUserById(localStorage.getItem("userId"))
    }

    initialState = {
        firstName: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        phoneNumber: '',
        lastName: ''
    };

    editUser = () => {
        const userId = localStorage.getItem("userId")
        axios.put(`http://localhost:8080/${userId}/edit`, this.state)
            .then(response => {
                localStorage.setItem("firstName", response.data.firstName)
                localStorage.setItem("lastName", response.data.lastName)
                window.location.reload();
            }).catch((error) => {
            alert("Wrong password")
        });
    };

    findUserById = (userId) => {
        axios.get(`http://localhost:8080/users/${userId}`)
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber,
                    lastName: response.data.lastName
                })
            }).catch((error) => {
            console.error("Error - " + error);
        });
    }


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


    render() {
        const {firstName, email, currentPassword, phoneNumber, newPassword, lastName} = this.state;

        return (
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    <Card className={"border border-dark bg-white text-dark"}>
                        <Card.Header>
                            Edit Profile
                        </Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required
                                                     autoComplete="off" type="text" name="firstName" value={firstName}
                                                     onChange={this.userChange}
                                                     className={"bg-white text-dark"} placeholder="First Name"/>
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
                                                     className={"bg-white text-dark"} placeholder="Last Name"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl disabled autoComplete="off" type="email" name="email" value={email}
                                                     onChange={this.userChange}
                                                     className={"bg-white text-dark"}
                                                     placeholder="Email Address"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faPhone}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="text" name="phoneNumber"
                                                     value={phoneNumber}
                                                     onChange={this.userChange}
                                                     className={"bg-white text-dark"}
                                                     placeholder="Contact Number"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="password" name="currentPassword"
                                                     value={currentPassword} onChange={this.userChange}
                                                     className={"bg-white text-dark"} placeholder="Current Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="password" name="newPassword"
                                                     value={newPassword} onChange={this.userChange}
                                                     className={"bg-white text-dark"} placeholder="New Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{textAlign: "right"}}>
                            <Button size="sm" type="button" variant="primary"
                                    onClick={this.editUser}>
                                SAVE
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
    }
}