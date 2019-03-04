import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardTitle,

} from 'reactstrap';

export default class ResultItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const course = this.props.course;
        return (
            <Card>
                <CardHeader>{course.asString}</CardHeader>
                <CardBody>
                    <h5>{course.title}</h5>
                    <CardText>{course.description || "No description available."}</CardText>
                </CardBody>

            </Card>
        );
    }
}