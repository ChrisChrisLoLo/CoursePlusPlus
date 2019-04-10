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

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", loginErr: false }

        this.attemptLogin = this.attemptLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    attemptLogin(e) {
        axios.post(process.env.REACT_APP_API_URL + "/api/rest-auth/login/", {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            document.cookie = "accessToken=" + res.data.key;
            let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            //console.log(cookieValue)
            this.props.history.push("/");
        }).catch(err => {
            this.setState({ loginErr: true });
        });
        e.preventDefault();
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }


    render() {
        const errMessage = this.state.loginErr
            ? <Alert color="danger"> Invalid credentials </Alert>
            : null;

        return (
            <Card>
                <CardHeader>Login</CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            {errMessage}
                            <Label for="username">Username</Label>
                            <Input type="text" id="username" onChange={this.handleUsernameChange} value={this.state.username} />
                            <Label for="password" >Password</Label>
                            <Input type="password" id="password" onChange={this.handlePasswordChange} value={this.state.password} />
                            <Button onClick={this.attemptLogin}>Login</Button>
                        </FormGroup>
                        <Button onClick={(e) => this.props.changeForm(e, "register")} color="link">Register</Button>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}