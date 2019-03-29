import React from "react";
import {
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
    constructor(props){
        super(props);
        this.state = {username:"", password:""}

        this.attemptLogin = this.attemptLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    attemptLogin(){
        
    }

    handleUsernameChange(e){
        this.setState({username:e.target.value});
    }

    handlePasswordChange(e){
        this.setState({password:e.target.value});
    }


    render() {
        console.log(this.state);
        return (
            <Card>
                <CardHeader>Login</CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" id="username" onChange={this.handleUsernameChange} value={this.state.username}/>
                            <Label for="password" value={this.state.password}>Password</Label>
                            <Input type="password" id="password"onChange={this.handlePasswordChange}/>
                            <Button>Login</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}