import React, {Component} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import eol from "eol";
import axios from "axios";

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.questionChange = this.questionChange.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
        console.log(localStorage.getItem("questionId"))
    }


    initialState = {
        forUserEmail: '',
        questionContent: '',
        answerType: '',
        possibleAnswersList: ''
    }

    componentDidMount() {
        const questionId = localStorage.getItem("questionId")
        if (questionId) {
            this.findQuestionById(questionId);
        }
    }


    findQuestionById = (questionId) => {
        axios.get(`http://localhost:8080/questions/${questionId}`)
            .then(response => {
                this.setState({
                    forUserEmail: response.data.forUserEmail,
                    questionContent: response.data.questionContent,
                    answerType: response.data.answerType,
                    possibleAnswersList: response.data.possibleAnswersList.join("\n")
                })
            }).catch((error) => {
            console.error("Error - " + error);
        });
    }

    submitQuestion(event) {
        const question = {
            ...this.state,
            possibleAnswersList: eol.split(this.state.possibleAnswersList)
        }
        const userId = localStorage.getItem("userId")
        axios.post(`http://localhost:8080/${userId}/questions/add`, question)
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);
                }
            });


        event.preventDefault();
        window.location.reload();
    }

    updateQuestion = event => {
        event.preventDefault();
        const question = {
            ...this.state,
            possibleAnswersList: eol.split(this.state.possibleAnswersList)
        }
        const userId = localStorage.getItem("userId")
        const questionId = localStorage.getItem("questionId")
        axios.put(`http://localhost:8080/${userId}/questions/${questionId}`, question)
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);
                }
            });
        window.location.reload();
    }

    questionChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {

        const {forUserEmail, questionContent, answerType, possibleAnswersList} = this.state;

        return (
            <Card className={"border border-light bg-white text-dark"}>
                <Card.Body>
                    <Form onSubmit={localStorage.getItem("questionId") ? this.updateQuestion : this.submitQuestion}
                          id="questionFormId">
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={4}>
                                For user
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    required autoComplete="off"
                                    type="email"
                                    value={forUserEmail} onChange={this.questionChange}
                                    name="forUserEmail"
                                    className={"bg-white text-dark"}
                                    placeholder="Enter user email"/>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalQuestion">
                            <Form.Label column sm={4}>
                                Question
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    required autoComplete="off"
                                    type="text"
                                    value={questionContent} onChange={this.questionChange}
                                    name="questionContent"
                                    className={"bg-white text-dark"}
                                    placeholder="Enter your question"/>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalAnswerType">
                            <Form.Label column sm={4}>
                                Answer type
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control as={'select'} name="answerType"
                                              value={answerType}
                                              onChange={this.questionChange}
                                              required
                                              className={"bg-white text-dark"}>
                                    <option></option>
                                    <option value="single line text">single line text</option>
                                    <option value="checkbox">checkbox</option>
                                    <option value="combobox">combobox</option>
                                    <option value="date">date</option>
                                    <option value="radio button">radio button</option>
                                    <option value="multiline text"> multiline text</option>

                                </Form.Control>

                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label column sm={4}>Options</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    value={possibleAnswersList}
                                    required={this.state.answerType === "combobox" || this.state.answerType === "checkbox" || this.state.answerType === "radio button"}
                                    disabled={this.state.answerType === "single line text" || this.state.answerType === "date" || this.state.answerType === "multiline text"}
                                    name="possibleAnswersList"
                                    onChange={this.questionChange}
                                    as="textarea" rows={3}/>
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {localStorage.getItem("questionId") ? "UPDATE" : "SAVE"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}