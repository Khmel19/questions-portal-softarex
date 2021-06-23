import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Navbar, Nav, Container, Row, Col} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Welcome from "./components/Welcome";
import Question from "./components/Question";
import QuestionList from "./components/QuestionList";
import AnswersList from "./components/AnswerList";
import Answer from "./components/Answer";

function App() {

    const marginTop = {
        marginTop:"20px"
    };

  return (
    <Router>
          <NavigationBar/>
        <Container>
            <Row>
                <Col lg={12} style={marginTop}>
                    <Switch>
                        <Route path="/" exact component = {Welcome}/>
                        <Route path="/questions/add" exact component = {Question}/>
                        <Route path="/questions/edit/:uuid" exact component ={Question}/>
                        <Route path="/questions" exact component = {QuestionList}/>
                        <Route path="/answers/edit/" exact component = {Answer}/>
                        <Route path="/answers" exact component = {AnswersList}/>
                    </Switch>
                </Col>
            </Row>
        </Container>

    </Router>
  );
}

export default App;
