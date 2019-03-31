import React from "react";
import {
    Row,
    Col
} from 'reactstrap';
import axios from "axios";

import LoginForm from "./LoginForm";

export default class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { formType: "logIn" };
    }

    render() {
        console.log(this.state);
        let displayedForm = <h3>Form could not be found</h3>;
        switch (this.state.formType) {
            case "logIn":
                displayedForm = <LoginForm history={this.props.history} />
                break;
        }
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
                        {displayedForm}
                    </Col>
                    <Col xs="2" sm="3" md="4"></Col>
                </Row>
            </div>
        );
    }
}