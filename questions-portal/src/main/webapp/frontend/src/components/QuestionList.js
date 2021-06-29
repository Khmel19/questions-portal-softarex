import React, {Component} from "react";
import {Button, ButtonGroup, Card, FormControl, InputGroup, Modal, Table} from "react-bootstrap";
import axios from "axios";
import {faEdit, faPlus, faStepBackward, faStepForward, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Question from "./Question";


export default class QuestionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentPage: 1,
            questionsPerPage: 5,
            show: false
        };
    }

    componentDidMount() {
        this.getQuestions(this.state.currentPage);
    }


    getQuestions(currentPage) {
        currentPage -= 1
        const userId = localStorage.getItem("userId")

        axios.get(`http://localhost:8080/api/${userId}/questions?page=${currentPage}&size=${this.state.questionsPerPage}`)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    questions: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            }).catch((error) => {
            console.log(error)
        });
    }


    fillStorage = (questionId) => {
        localStorage.setItem("questionId", questionId)
        this.setShow(true)
    }


    setShow = (something) => {
        this.setState({
            show: something
        })
    }


    clearStorage = () => {
        localStorage.removeItem("questionId")
        this.setShow(true)
    }


    deleteQuestion = (questionId) => {
        const userId = localStorage.getItem("userId")
        axios.delete(`http://localhost:8080/api/${userId}/questions/${questionId}/delete`)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        questions: this.state.questions.filter(question => question.id !== questionId)
                    });

                }
            });
    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        this.getQuestions(targetPage)
        this.setState({
            [event.target.name]: targetPage
        });

    };


    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.getQuestions(this.state.currentPage - prevPage);
        }
    };


    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.questionsPerPage)) {
            this.getQuestions(this.state.currentPage + 1)
        }
    }

    render() {
        const {questions, currentPage, totalPages} = this.state;


        const pageNumCss = {
            width: "45px",
            color: "#ffffff",
            textAlign: "center",
            fontWeight: "bold"
        }


        return (
            <Card className={"border border-light bg-white text-dark"}>
                <Card.Header>Your questions
                    <Button size="sm" style={{marginLeft: 846}}
                            onClick={this.clearStorage}
                            variant="primary"><FontAwesomeIcon
                        icon={faPlus}/> Add question</Button>
                </Card.Header>
                <Card.Body>
                    <Modal show={this.state.show}
                           onHide={() => this.setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title
                                className={"text-sm-left"}> {localStorage.getItem("questionId") ? "Update question" : "Add question"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Question/>
                        </Modal.Body>
                    </Modal>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>For user</th>
                            <th>Question</th>
                            <th>Answer type</th>
                            <th>Answer</th>
                            <th width={"20"}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {questions.length === 0 ?
                            <tr align={"center"}>
                                <td colSpan="4">No Question Available.</td>
                            </tr> :
                            questions.map((question) => (
                                <tr key={question.id}>
                                    <td>{question.forUserEmail}</td>
                                    <td>{question.questionContent}</td>
                                    <td>{question.answerType}</td>
                                    <td>{question.answer}</td>
                                    <td><ButtonGroup>
                                        <Button size="sm"
                                                onClick={this.fillStorage.bind(this, question.id)}
                                                variant="outline-secondary"><FontAwesomeIcon
                                            icon={faEdit}/></Button>
                                        <Button size="sm"
                                                style={{marginLeft: 5}}
                                                onClick={this.deleteQuestion.bind(this, question.id)}
                                                variant="outline-secondary"><FontAwesomeIcon icon={faTrash}/></Button>
                                    </ButtonGroup></td>
                                </tr>
                            ))
                        }


                        </tbody>
                    </Table>
                </Card.Body>
                {questions.length > 0 ?
                    <Card.Footer style={{"display": "flex"}}>
                        <div>
                            {currentPage > totalPages ? 0 : 1} - {questions.length} of {Math.ceil(totalPages)}
                        </div>
                        <div style={{marginLeft: "38%"}}>
                            <InputGroup size={"sm"}>
                                <InputGroup.Prepend>
                                    <Button type="button"
                                            disabled={currentPage === 1}
                                            className={"border border-dark bg-white text-dark"}
                                            onClick={this.prevPage}>

                                        <FontAwesomeIcon icon={faStepBackward}/>
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl style={pageNumCss}
                                             name="currentPage"
                                             value={currentPage}
                                             onChange={this.changePage}
                                             className={"bg-primary"}>

                                </FormControl>
                                <InputGroup.Append>
                                    <Button type="button"
                                            disabled={currentPage === totalPages}
                                            className={"border border-dark bg-white text-dark"}
                                            onClick={this.nextPage}>
                                        <FontAwesomeIcon icon={faStepForward}/>
                                    </Button>

                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Footer> : null
                }
            </Card>
        );
    }

}


