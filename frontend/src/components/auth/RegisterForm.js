import React from "react";
import {
    Alert,
    Card,
    CardHeader,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import axios from "axios";
import { targetPropType } from "reactstrap/lib/utils";

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", passwordConf: "", registerErr: false }

        this.attemptRegister = this.attemptRegister.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfChange = this.handlePasswordConfChange.bind(this);
    }

    attemptRegister(e) {
        axios.post(process.env.REACT_APP_API_URL + "/api/rest-auth/login/", {
            username: this.state.username,
            password1: this.state.password,
            password2: this.state.passwordConf
        }).then(res => {
            console.log(res)
        }).catch(err => {
            this.setState({ registerErr: true });
        });
        e.preventDefault();
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handlePasswordConfChange(e) {
        this.setState({ passwordConf: e.target.value });
    }


    render() {
        const errMessage = this.state.registerErr
            ? <Alert color="danger"> Could not register </Alert>
            : null;

        return (
            <Card>
                <CardHeader>Register</CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            {errMessage}
                            <Label for="username">Username</Label>
                            <Input type="text" id="username" onChange={this.handleUsernameChange} value={this.state.username} />
                            <Label for="password">Password</Label>
                            <Input type="password" id="password" onChange={this.handlePasswordChange} value={this.state.password} />
                            <Label for="passwordConf" >Confirm Password</Label>
                            <Input type="password" id="passwordConf" onChange={this.handlePasswordConfChange} value={this.state.passwordConf} />
                            <Button onClick={this.attemptRegister}>Register</Button>
                        </FormGroup>
                        <Button onClick={(e) => this.props.changeForm(e, "logIn")} color="link">Log In</Button>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}