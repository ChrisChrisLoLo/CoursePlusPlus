import React from "react";
import {
  Button,
  Card,
  CardBody,
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
    // this.state = {added: false};
  }

  addCourseClass(courseClassId) {
    if(!this.props.checkFromMap(courseClassId)){
      axios.post(process.env.REACT_APP_API_URL + "/api/classCart/", {
        courseClass: this.props.courseClass.id
      }, {
        headers: {Authorization: getAuthToken()}
      }).then(res => {
        this.props.addClassCartToMap(courseClassId,res.data.id);
      });
    }
    else{
      console.error("Class is already in map")
    }
  }

  removeCourseClass(courseClassId) {
    if(this.props.checkFromMap(courseClassId)) {
      axios.delete(process.env.REACT_APP_API_URL + "/api/classCart/" + this.props.getFromMap(courseClassId) + "/", {
        headers: {Authorization: getAuthToken()}
      }).then(res => {
        this.props.removeClassCartFromMap(courseClassId);
      });
    }
    else{
      console.error("Class was not in the map to begin with");
    }
  }

  render() {
    const courseClass = this.props.courseClass;

    const classtimes = courseClass.classtime_set;
    let classtime = null;
    if (classtimes) {
      classtime = classtimes[0]
    }
    let button;
    if (!isAuthenticated()) {
      button = <Button disabled={true} size="sm">Log in to add</Button>
    } else if (!this.props.checkFromMap(courseClass.id)) {
      button = <Button size="sm" onClick={() => this.addCourseClass(courseClass.id)}>Add to builder</Button>
    } else {
      button = <Button size="sm" onClick={() => this.removeCourseClass(courseClass.id)}>Remove from builder</Button>
    }

    return (
      <Card className={"my-2"}>
        <CardBody className={"small course-class-container"}>
          <h6>{courseClass.asString}</h6>
          <p>Code: {courseClass.calendarCode}</p>
          <p>Days: {classtime ? classtime.day : "N/A"} </p>
          <p>Location: {classtime ? classtime.location : "N/A"} </p>
          <p>Term: {courseClass.term.title} </p>
          {/*ONLY USE IF DATA IS LIVE <p>Status: {courseClass.enrollStatus}</p>*/}

          <CardText>{"Notes: " + (courseClass.notes || "No notes available.")}</CardText>
          {button}
        </CardBody>
      </Card>
    );
  }
}