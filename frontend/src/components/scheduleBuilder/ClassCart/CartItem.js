import React from "react";
import {
  Button,
  Card,
  CardBody,
} from 'reactstrap';
import CardText from "reactstrap/es/CardText";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
    this.removeFromCart = this.removeFromCart.bind(this);
    this.removeFromCartOffline = this.removeFromCartOffline.bind(this);
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
    //Button will change, so act as though the mouse is moving off the button
    this.props.setCoursePreviewed(null)
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
    //Button will change, so act as though the mouse is moving off the button
    this.props.setCoursePreviewed(null)
  }

  removeCourseClassOffline() {
    this.props.handleCourseClassRemove(this.props.classCart);
    const courseCart = JSON.parse(localStorage.getItem("courseListData"));
    const targetClassCart = courseCart.find((classCart)=>{return this.props.classCart.courseClass.id === classCart.courseClass.id});
    targetClassCart.isInSchedule = false;
    localStorage.setItem("courseListData",JSON.stringify(courseCart));
  }


  removeFromCart(){
    axios.delete(process.env.REACT_APP_API_URL + "/api/classCart/" + this.props.classCart.id + "/", {
      headers: {Authorization: getAuthToken()}
    }).then(res => {
      this.props.removeFromClassCart(this.props.classCart);
    });

  }

  removeFromCartOffline(){
    const currClassCart = JSON.parse(localStorage.getItem("courseListData"));
    //Remove the class id from the localStorage array
    const filteredClasses = currClassCart.filter((classCartItem)=>{
      return classCartItem.id !== this.props.classCart.id;
    });
    localStorage.setItem("courseListData",JSON.stringify(filteredClasses));
    this.props.removeFromClassCart(this.props.classCart);
  }


  render() {
    let button;
    //Disable button if there are no classtimes
    if(this.props.classCart.courseClass.classtime_set === null || this.props.classCart.courseClass.classtime_set.length === 0){
      button = <Button disabled={true} size={"sm"}>This course has no class times</Button>;
    }
    else if(isAuthenticated()) {
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
          <FontAwesomeIcon icon={["far","window-close"]} className={"float-right icon-button"} onClick={isAuthenticated()?this.removeFromCart:this.removeFromCartOffline}/>
          <CardText className={"my-0"}>{courseString}</CardText>
          <CardText className={"mb-0 small"}>{courseClassString}</CardText>
          <CardText className={"mb-2 small"}>{course.id}</CardText>
          {button}
        </CardBody>
      </Card>
    );
  }
}