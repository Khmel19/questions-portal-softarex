import React from "react";
import {Jumbotron} from "react-bootstrap";

class Welcome extends React.Component {
    render() {
        return (
            <Jumbotron className="bg-light text-dark">
                <h1>Welcome to Question Portal</h1>
                <blockquote className=" blockquote mb-0">
                    <p>
                        Good friends, good books, and a sleepy conscience: this is ideal life.
                    </p>
                    <footer className="blockquote-footer">
                        Mark Rwain
                    </footer>
                </blockquote>
            </Jumbotron>
        );
    }
}
export default Welcome;