import React from "react";
import {
  Button,
  Card,
  CardBody,
} from 'reactstrap';
import CardText from "reactstrap/es/CardText";
import axios from "axios";
import getAuthToken from "../../../userLib/getAuthToken";

export default class ClassCart extends React.Component {
  constructor(props) {
    super(props);
    this.addCourseClass = this.addCourseClass.bind(this);
    this.removeCourseClass = this.removeCourseClass.bind(this);
  }

  addCourseClass() {
    this.props.handleCourseClassAdd(this.props.classCart);
    axios.patch(process.env.REACT_APP_API_URL + "/api/classCart/" + this.props.classCart.id + "/", {
      isInSchedule: true,
    }, {
      headers: {Authorization: getAuthToken()},
    }).then((res) => {
      console.log("update successful");
    });
  }

  removeCourseClass() {
    this.props.handleCourseClassRemove(this.props.classCart);
    axios.patch(process.env.REACT_APP_API_URL + "/api/classCart/" + this.props.classCart.id + "/", {
      isInSchedule: false,
    }, {
      headers: {Authorization: getAuthToken()},
    }).then((res) => {
      console.log("update successful");
    });
  }


  render() {

    const button = this.props.courseAdded === true ?
      <Button onClick={this.removeCourseClass} size={"sm"}>Remove Class</Button> :
      <Button onClick={this.addCourseClass} size={"sm"}>Add Class</Button>;

    const course = this.props.classCart.courseClass;
    const asString = course.asString.split(" ");

    let courseString;
    let courseClassString;

    if (asString.length === 5) {
      courseString = asString[0] + " " + asString[1] + " " + asString[2];
      courseClassString = asString[3] + " " + asString[4];
    } else {
      courseString = asString[0] + " " + asString[1];
      courseClassString = asString[2] + " " + asString[3];
    }


    return (
      <Card className={"mx-0 my-1"}>
        <CardBody className={"px-1 py-1"}>
          <CardText className={"my-0"}>{courseString}</CardText>
          <CardText className={"mb-0 small"}>{courseClassString}</CardText>
          <CardText className={"mb-2 small"}>{course.id}</CardText>
          {button}
        </CardBody>
      </Card>
    );
  }
}