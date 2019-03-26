import React from "react";
import {
    Row,
    Col
} from 'reactstrap';
import axios from "axios";

export default class AuthPage extends React.Component {
    render() {
        console.log(this.state);
        return (
            <div>
                <Row>
                    <Col>
                        <h3>Login</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>FORM</h1>
                    </Col>
                </Row>
            </div>
        );
    }
}