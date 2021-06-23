import React, {Component} from "react";
import {Card, Form, Button, Col, Row, Modal} from "react-bootstrap";
import eol from "eol";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

export default class Answer extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.answerChange = this.answerChange.bind(this);
    }

    initialState = {
        fromUserEmail: '',
        questionContent: '',
        answerType: '',
        answer: '',
        possibleAnswersList: ''
    }

    componentDidMount() {
        const answerId = localStorage.getItem("answerId")
        if (answerId) {
            this.findAnswerById(answerId);
        }else {

        }
    }


    findAnswerById = (answerId) => {
        axios.get(`http://localhost:8080/answers/${answerId}`)
            .then(response => {
                this.setState({
                    fromUserEmail: response.data.fromUserEmail,
                    questionContent: response.data.questionContent,
                    answerType: response.data.answerType,
                    answer: response.data.answer,
                    possibleAnswersList: response.data.possibleAnswersList.join("\n")
                })
            }).catch((error) => {
            console.error("Error - " + error);
        });
    }


    updateAnswer = event => {
        event.preventDefault();
        const question = {
            ...this.state,
            possibleAnswersList: eol.split(this.state.possibleAnswersList)
        }
        const answerId = localStorage.getItem("answerId")
        axios.put(`http://localhost:8080/3/answers/${answerId}/edit`, question)
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);
                    this.questionList();
                }
            });
    }

    answerChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    // answersList = () => {
    //     return this.props.history.push("/answers")
    // }

    render() {
        const {fromUserEmail, questionContent, answerType, answer, possibleAnswersList} = this.state;
        return (
            <Card className={"border border-light bg-white text-dark"}>

                <Card.Body>
                    <Form onSubmit={this.updateAnswer} id="answerFormId">
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                                From user
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    disabled
                                    autoComplete="off"
                                    type="email"
                                    value={fromUserEmail} onChange={this.answerChange}
                                    name="forUserEmail"
                                    className={"bg-white text-dark"}
                                    placeholder="Enter user email"/>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalQuestion">
                            <Form.Label column sm={3}>
                                Question
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    disabled autoComplete="off"
                                    type="text"
                                    value={questionContent} onChange={this.answerChange}
                                    name="questionContent"
                                    className={"bg-white text-dark"}
                                    placeholder="Enter your question"/>
                            </Col>
                        </Form.Group>


                        {/*<Form.Group as={Row} className="mb-3" controlId="formHorizontalAnswerType">*/}
                        {/*    <Form.Label column sm={2}>*/}
                        {/*        Answer type*/}
                        {/*    </Form.Label>*/}
                        {/*    <Col sm={10}>*/}
                        {/*        <Form.Control  name="answerType"*/}
                        {/*                      value={answerType}*/}
                        {/*                      onChange={this.answerChange}*/}
                        {/*                      disabled*/}
                        {/*                      className={"bg-white text-dark"}>*/}

                        {/*        </Form.Control>*/}

                        {/*    </Col>*/}
                        {/*</Form.Group>*/}

                        {/*<Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">*/}
                        {/*    <Form.Label column sm={2}>Options</Form.Label>*/}
                        {/*    <Col sm={10}>*/}
                        {/*        <Form.Control*/}
                        {/*            value={possibleAnswersList}*/}
                        {/*            name="possibleAnswersList"*/}
                        {/*            onChange={this.answerChange}*/}
                        {/*            as="textarea" rows={3}/>*/}
                        {/*    </Col>*/}
                        {/*</Form.Group>*/}
                        {/*<Button className={"border border-dark bg-white text-dark"}*/}
                        {/*        style={{marginLeft: 890}}*/}
                        {/*        onClick={this.answersList.bind()}*/}
                        {/*        type="button">*/}
                        {/*    CANCEL*/}
                        {/*</Button>*/}
                        <Button  variant="primary" type="submit">
                            { "SUBMIT"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}