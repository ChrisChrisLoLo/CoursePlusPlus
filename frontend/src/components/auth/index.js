import React from "react";
import {
    Row,
    Col
} from 'reactstrap';
import axios from "axios";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { formType: "logIn" };
        this.changeForm = this.changeForm.bind(this);
    }

    changeForm(e, newForm) {
        this.setState({ formType: newForm });
        e.preventDefault();
    }

    render() {
        console.log(this.state);
        let displayedForm = <h3>Form could not be found</h3>;
        switch (this.state.formType) {
            case "logIn":
                displayedForm = <LoginForm history={this.props.history} changeForm={this.changeForm} />
                break;
            case "register":
                displayedForm = <RegisterForm history={this.props.history} changeForm={this.changeForm} />
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