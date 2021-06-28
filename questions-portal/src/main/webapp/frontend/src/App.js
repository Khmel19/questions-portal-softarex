import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Navbar, Nav, Container, Row, Col} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Welcome from "./components/Welcome";
import Question from "./components/Question";
import QuestionList from "./components/QuestionList";
import AnswersList from "./components/AnswerList";
import Answer from "./components/Answer";
import Login from "./components/Login";
import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from 'tough-cookie';
import Registration from "./components/Registration";
import DeleteUser from "./components/DeleteUser";
import EditProfile from "./components/EditProfile";

const cookieJar = new tough.CookieJar()
axiosCookieJarSupport(axios)
axios.defaults.jar = cookieJar
axios.defaults.withCredentials = true

// window.axios = axios

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
                        <Route path='/registration' exact component = {Registration}/>
                        <Route path="/questions" exact component = {QuestionList}/>
                        <Route path="/login" exact component = {Login}/>
                        <Route path="/answers" exact component = {AnswersList}/>
                        <Route path="/delete" exact component = {DeleteUser}/>
                        <Route path="/edit" exact component = {EditProfile}/>
                    </Switch>
                </Col>
            </Row>
        </Container>

    </Router>
  );
}

export default App;
