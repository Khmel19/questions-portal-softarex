import React, {Component} from 'react';
import {Button, Card, Col, Form, FormControl, InputGroup, Row} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faTrash} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.redirectCheck()
    }

    initialState = {
        password: ''
    };
    redirectCheck = () => {
        if (!localStorage.getItem("authenticated")) {
            return this.props.history.push("/");
        }
    }
    credentialChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    deleteUser = () => {
        const userId = localStorage.getItem("userId")
        axios.post(`http://localhost:8080/${userId}/delete`, this.state)
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


    render() {
        const {password} = this.state;

        return (
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    <Card className={"border border-dark bg-white text-dark"}>
                        <Card.Header>
                            Delete Profile
                        </Card.Header>
                        <Card.Body>
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
                            <Button size="sm"
                                    type="button"
                                    required
                                    variant="primary"
                                    onClick={() => {
                                        this.deleteUser()
                                    }}
                                    disabled={password === ''}>
                                <FontAwesomeIcon icon={faTrash}/> Delete Account
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
    }
}


export default DeleteUser;