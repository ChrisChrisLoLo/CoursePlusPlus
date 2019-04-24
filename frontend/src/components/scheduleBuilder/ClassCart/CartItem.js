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