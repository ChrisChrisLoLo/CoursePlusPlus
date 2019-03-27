import React from "react";
import {
    Row,
    Col
} from 'reactstrap';
import axios from "axios";

import LoginForm from "./LoginForm";

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
                    <Col xs="2" sm="3" md="4"></Col>
                    <Col>
                        <LoginForm/>
                    </Col>
                    <Col xs="2" sm="3" md="4"></Col>
                </Row>
            </div>
        );
    }
}