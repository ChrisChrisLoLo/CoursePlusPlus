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
import isAuthenticated from "../../userLib/isAuthenticated";
import "./styles/ResultItemClass.css";

export default class ResultItemClass extends React.Component {
    constructor(props) {
        super(props);
        this.addCourseClass = this.addCourseClass.bind(this);
        this.removeCourseClass = this.removeCourseClass.bind(this);
        this.state = {added:false};
    }

    addCourseClass(e){
        axios.post(process.env.REACT_APP_API_URL + "/api/classCart/", {
            courseClass : this.props.courseClass.id
        },{
            headers:{Authorization:getAuthToken()}
        }).then(res => {
            this.setState({added:true})
        });
    }

    removeCourseClass(e){
        axios.delete(process.env.REACT_APP_API_URL + "/api/classCart/", {
            courseClass : this.props.courseClass.id
        },{
            headers:{Authorization:getAuthToken()}
        }).then(res => {
            this.setState({added:false})
        });
    }

    render() {
        const courseClass = this.props.courseClass;

        const classtimes = courseClass.classtime_set;
        let classtime = null;
        if(classtimes){
            classtime = classtimes[0]
        }
        let button;
        if(!isAuthenticated()){
            button = <Button disabled={true} size="sm">Log in to add</Button>
        }
        else if(this.state.added === false){
            button = <Button size="sm" onClick={this.addCourseClass}>Add to builder</Button>
        }
        else{
            button = <Button size="sm" onClick={this.removeCourseClass}>Remove from builder</Button>
        }




        return (
            <Card className={"mt-2"}>
                <CardBody className={"small course-class-container"}>
                    <h6>{courseClass.asString}</h6>
                    <p>Code: {courseClass.calendarCode}</p>
                    <p>Days: {classtime ? classtime.day : "N/A"} </p>
                    <p>Location: {classtime ? classtime.location : "N/A"} </p>
                    <p>Term: {courseClass.term.title} </p>
                    {/*ONLY USE IF DATA IS LIVE <p>Status: {courseClass.enrollStatus}</p>*/}

                    <CardText>{"Notes: "+(courseClass.notes || "No notes available.")}</CardText>
                    {button}
                </CardBody>
            </Card>
        );
    }
}