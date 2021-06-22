import React, {Component} from "react";
import {Button, ButtonGroup, Card, FormControl, InputGroup, Table} from "react-bootstrap";
import axios from "axios";
import {faEdit, faPlus, faTrash, faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

export default class AnswersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            currentPage: 1,
            answersPerPage: 5
        };
    }

    componentDidMount() {
        this.getAnswers(this.state.currentPage);
    }


    getAnswers(currentPage) {
        currentPage -= 1
        axios.get(`http://localhost:8080/3/answers?page=${currentPage}&size=${this.state.answersPerPage}`)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    answers: data.content,
                    totalPages : data.totalPages,
                    totalElements : data.totalElements,
                    currentPage : data.number + 1
                });
            });
    }

    fillStorage = (answerId) => {
        localStorage.setItem("answerId", answerId)
    }


    changePage = event => {
        let targetPage = parseInt(event.target.value);
        this.getAnswers(targetPage)
        this.setState({
            [event.target.name]: targetPage
        });

    };


    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.getAnswers(this.state.currentPage - prevPage);
        }
    };


    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.answersPerPage)) {
            this.getAnswers(this.state.currentPage + 1)
        }
    }

    render() {
        const {answers, currentPage, totalPages} = this.state;


        const pageNumCss = {
            width: "45px",
            color: "#ffffff",
            textAlign: "center",
            fontWeight: "bold"
        }


        return (
            <Card className={"border border-light bg-white text-dark"}>
                <Card.Header>Answer the question
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>From user</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th width={"20"}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {answers.length === 0 ?
                            <tr align={"center"}>
                                <td colSpan="4">No Answers Available.</td>
                            </tr> :
                            answers.map((answer) => (
                                <tr key={answer.id}>
                                    <td>{answer.fromUserEmail}</td>
                                    <td>{answer.questionContent}</td>
                                    <td>{answer.answer}</td>
                                    <td><ButtonGroup>
                                        {/*<Link to={`edit/${question.uuid}`}*/}
                                        {/*      className={"btn btn-sm btn-outline-secondary"}>*/}
                                        {/*    */}
                                        {/*    <FontAwesomeIcon icon={faEdit}/>*/}
                                        {/*</Link>*/}
                                        <Button size="sm"
                                                href={`edit/${answer.uuid}`}
                                                onClick={this.fillStorage.bind(this, answer.id)}
                                                variant="outline-secondary"><FontAwesomeIcon
                                            icon={faEdit}/></Button>
                                        </ButtonGroup></td>
                                </tr>
                            ))
                        }


                        </tbody>
                    </Table>
                </Card.Body>
                {answers.length > 0 ?
                    <Card.Footer style={{"display": "flex"}}>
                        <div>
                            {currentPage > totalPages ? 0 : 1} - {answers.length} of {Math.ceil(totalPages)}
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

