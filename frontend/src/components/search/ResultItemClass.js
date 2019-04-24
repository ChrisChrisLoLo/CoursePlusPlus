import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
} from 'reactstrap';
import axios from "axios";
import getAuthToken from "../../userLib/getAuthToken";

export default class ResultItemClass extends React.Component {
    constructor(props) {
        super(props);
        this.addCourseClass = this.addCourseClass.bind(this);
    }

    addCourseClass(e){

        axios.post(process.env.REACT_APP_API_URL + "/api/classCart/", {
            courseClass : this.props.courseClass.id
        },{
            headers:{Authorization:getAuthToken()}
        }).then(res => {
        });

    }

    render() {
        return (
            <Card >
                <CardHeader>{this.props.courseClass.calendarCode}</CardHeader>
                <CardBody>
                    <p>{this.props.courseClass.startDate}</p>
                    <p>{this.props.courseClass.endDate}</p>
                    <CardText>{this.props.courseClass.description || "No description available."}</CardText>
                    <Button size="sm" onClick={this.addCourseClass}>Add to builder</Button>
                </CardBody>
            </Card>
        );
    }
}