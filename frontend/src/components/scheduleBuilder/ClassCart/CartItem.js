import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Form,
    FormGroup,
    Input,
} from 'reactstrap';
import CartItem from "./CartItem";

import axios from "axios";
import getAuthToken from "../../../userLib/getAuthToken";


export default class ClassCart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <p>{this.props.course.id}</p>
                <Button>Add Class</Button>
            </Card>
        );
    }
}