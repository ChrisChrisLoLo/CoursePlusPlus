import React from "react";
import {
  Button,
  Card,
  CardBody,
} from 'reactstrap';
import CardText from "reactstrap/es/CardText";
import axios from "axios";
import getAuthToken from "../../../userLib/getAuthToken";
import isAuthenticated from "../../../userLib/isAuthenticated";

export default class ClassCart extends React.Component {
  constructor(props) {
    super(props);
    this.addCourseClass = this.addCourseClass.bind(this);
    this.removeCourseClass = this.removeCourseClass.bind(this);
    this.addCourseClassOffline = this.addCourseClassOffline.bind(this);
    this.removeCourseClassOffline = this.removeCourseClassOffline.bind(this);
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

  addCourseClassOffline() {
    this.props.handleCourseClassAdd(this.props.classCart);
    const courseCart = JSON.parse(localStorage.getItem("courseListData"));
    const targetClassCart = courseCart.find((classCart)=>{return this.props.classCart.courseClass.id === classCart.courseClass.id});
    targetClassCart.isInSchedule = true;
    localStorage.setItem("courseListData",JSON.stringify(courseCart));
  }

  removeCourseClassOffline() {
    this.props.handleCourseClassRemove(this.props.classCart);
    const courseCart = JSON.parse(localStorage.getItem("courseListData"));
    const targetClassCart = courseCart.find((classCart)=>{return this.props.classCart.courseClass.id === classCart.courseClass.id});
    targetClassCart.isInSchedule = false;
    localStorage.setItem("courseListData",JSON.stringify(courseCart));
  }

  render() {
    let button;
    if(isAuthenticated()) {
      button = this.props.courseAdded === true ?
        <Button onClick={this.removeCourseClass} size={"sm"}>Remove Class</Button> :
        <Button onClick={this.addCourseClass} size={"sm"}
                onMouseEnter={() => this.props.setCoursePreviewed(this.props.classCart.courseClass)}
                onMouseLeave={() => this.props.setCoursePreviewed(null)}>Add Class</Button>;
    }
    else{
      button = this.props.courseAdded === true ?
        <Button onClick={this.removeCourseClassOffline} size={"sm"}>Remove Class</Button> :
        <Button onClick={this.addCourseClassOffline} size={"sm"}
                onMouseEnter={() => this.props.setCoursePreviewed(this.props.classCart.courseClass)}
                onMouseLeave={() => this.props.setCoursePreviewed(null)}>Add Class</Button>;
    }

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