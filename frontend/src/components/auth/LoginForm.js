import React from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import axios from "axios";

export default class AuthPage extends React.Component {
    render() {
        console.log(this.state);
        return (
            <Form>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" id="username"/>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password"/>
                </FormGroup>
            </Form>
        );
    }
}