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
        const courseClass = this.props.courseClass;
        return (
            <Card >
                <CardBody className={"small"}>
                    <p>Code: {courseClass.calendarCode}</p>
                    <p>Date: ({courseClass.startDate}) - ({courseClass.endDate}) TO REMOVE</p>
                    <p>Days: NEED TO JOIN CLASSTIMES </p>
                    <p>Location: NEED TO JOIN LOCATION</p>
                    <p>Term: NEED TO JOIN TERM </p>
                    <p>Status: {courseClass.enrollStatus}</p>

                    <CardText>{"Notes: "+(courseClass.notes || "No notes available.")}</CardText>
                    <Button size="sm" onClick={this.addCourseClass}>Add to builder</Button>
                </CardBody>
            </Card>
        );
    }
}