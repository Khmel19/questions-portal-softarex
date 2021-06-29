import React, {Component} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

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
        possibleAnswersList: [],
        date: new Date()
    }

    componentDidMount() {
        const answerId = localStorage.getItem("answerId")
        if (answerId) {
            this.findAnswerById(answerId);
        } else {

        }
    }


    findAnswerById = (answerId) => {
        axios.get(`http://localhost:8080/api/answers/${answerId}`)
            .then(response => {
                this.setState({
                    fromUserEmail: response.data.fromUserEmail,
                    questionContent: response.data.questionContent,
                    answerType: response.data.answerType,
                    answer: response.data.answer,
                    possibleAnswersList: response.data.possibleAnswersList,
                    date: response.data.answer
                })
            }).catch((error) => {
            console.error("Error - " + error);
        });
    }


    updateAnswer = event => {
        event.preventDefault();

        const answer = {
            ...this.state,
        }
        const answerId = localStorage.getItem("answerId")
        axios.put(`http://localhost:8080/api/answers/${answerId}`, answer)
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);

                }
            });
        window.location.reload();
    }


    handleDateChange = (date) => {
        this.setState({
            date,
            answer: date.toString().substring(4, 16)
        })
    };

    answerChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

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
                                    className={"table-sub-heading-color text-dark"}
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
                                    className={"table-sub-heading-color text-dark"}
                                    placeholder="Enter your question"/>
                            </Col>
                        </Form.Group>

                        {this.state.answerType === "combobox" &&
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control as={'select'} name="answer"
                                              value={answer}
                                              controlId="group"
                                              onChange={this.answerChange}
                                              required
                                              className={"bg-white text-dark"}>
                                    <option></option>
                                    {possibleAnswersList.map(function (answer) {
                                        return <option key={answer}
                                                       value={answer}>{answer}</option>
                                    })}

                                </Form.Control>
                            </Col>
                            <Form.Label column sm={3}>
                            </Form.Label>
                        </Form.Group>
                        }


                        {this.state.answerType === "single line text" &&
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalQuestion">
                            <Form.Label column sm={3}>
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    autoComplete="off"
                                    type="text"
                                    required
                                    value={answer} onChange={this.answerChange}
                                    name="answer"

                                    className={"table-sub-heading-color text-dark"}
                                />
                            </Col>
                            <Form.Label column sm={3}>
                            </Form.Label>
                        </Form.Group>
                        }


                        {this.state.answerType === "multiline text" &&
                        <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label column sm={3}>
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    name="answer"
                                    value={answer}
                                    required
                                    onChange={this.answerChange}
                                    as="textarea" rows={3}/>
                            </Col>
                            <Form.Label column sm={3}>
                            </Form.Label>
                        </Form.Group>
                        }
                        {this.state.answerType === "radio button" &&

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>
                            </Form.Label>
                            <Col sm={10}>
                                <Form name="answer"
                                      value={answer}
                                      onChange={this.answerChange}
                                      required
                                      className={"bg-white text-dark"}>

                                    {possibleAnswersList.map(function (answer) {
                                        return <Form.Check value={answer}
                                                           label={answer}
                                                           required
                                                           name="answer"
                                                           aria-label="radio 1"
                                                           type="radio"/>
                                    })}

                                </Form>
                            </Col>
                            <Form.Label column sm={3}>
                            </Form.Label>
                        </Form.Group>
                        }

                        {this.state.answerType === "checkbox" &&
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>
                            </Form.Label>
                            <Col sm={10}>
                                <Form name="answer"
                                      value={answer}
                                      onChange={this.answerChange}
                                      required
                                      className={"bg-white text-dark"}>

                                    {possibleAnswersList.map(function (answer) {
                                        return <Form.Check value={answer}
                                                           label={answer}
                                                           required
                                                           name="answer"
                                                           aria-label="radio 1"
                                                           type="checkbox"/>
                                    })}

                                </Form>
                            </Col>
                            <Form.Label column sm={3}>
                            </Form.Label>
                        </Form.Group>
                        }
                        {this.state.answerType === "date" &&
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalQuestion">
                            <Form.Label column sm={3}>
                            </Form.Label>
                            <Col sm={10}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        required
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Select date"
                                        value={this.state.date}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Col>
                            <Form.Label column sm={3}>
                            </Form.Label>
                        </Form.Group>
                        }
                        <Button variant="primary" type="submit">
                            {"SUBMIT"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}