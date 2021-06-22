import React, {Component} from "react";
import {Card, Form, Button, Col, Row, Modal} from "react-bootstrap";
import eol from "eol";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

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
        const questionUUId = this.props.match.params.uuid;
        const questionId = localStorage.getItem("questionId")
        if (questionUUId) {
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
        axios.post("http://localhost:8080/3/questions/add", question)
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);
                }
            });


        event.preventDefault();
    }

updateQuestion = event => {
        event.preventDefault();
    const question = {
        ...this.state,
        possibleAnswersList: eol.split(this.state.possibleAnswersList)
    }
    const questionId = localStorage.getItem("questionId")
    axios.put(`http://localhost:8080/3/questions/${questionId}/edit`, question)
        .then(response => {
             if (response.data != null) {
                this.setState(this.initialState);
                this.questionList();
             }
        });
}
    questionChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    questionList = () => {
        return this.props.history.push("/questionList")
    }

    render() {

        const {forUserEmail, questionContent, answerType, possibleAnswersList} = this.state;

        return (
            <Card className={"border border-light bg-white text-dark"}>
                <Card.Header> {this.props.match.params.uuid ? "Update question" : "Add question"}</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.props.match.params.uuid ? this.updateQuestion : this.submitQuestion} id="questionFormId">
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                For user
                            </Form.Label>
                            <Col sm={10}>
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
                            <Form.Label column sm={2}>
                                Question
                            </Form.Label>
                            <Col sm={10}>
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
                            <Form.Label column sm={2}>
                                Answer type
                            </Form.Label>
                            <Col sm={10}>
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
                            <Form.Label column sm={2}>Options</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    value={possibleAnswersList}
                                    name="possibleAnswersList"
                                    onChange={this.questionChange}
                                    as="textarea" rows={3}/>
                            </Col>
                        </Form.Group>
                        <Button className={"border border-dark bg-white text-dark"}
                                style={{marginLeft: 890}}
                                onClick={ this.questionList.bind()}
                                type="button">
                            CANCEL
                        </Button>
                        <Button style={{marginLeft: 10}} variant="primary" type="submit">
                            {this.props.match.params.uuid ? "UPDATE" : "SAVE"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}