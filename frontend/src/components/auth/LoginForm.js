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

export default class LoginForm extends React.Component {
    render() {
        console.log(this.state);
        return (
            <Card>
                <CardHeader>Login</CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" id="username"/>
                            <Label for="password">Password</Label>
                            <Input type="password" id="password"/>
                            <Button>Login</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}