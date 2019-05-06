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
import CardText from "reactstrap/es/CardText";

export default class ClassCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courseAdded:false};
        this.addCourseClass = this.addCourseClass.bind(this);
        this.removeCourseClass = this.removeCourseClass.bind(this);
    }

    addCourseClass(){
        this.props.handleCourseClassAdd(this.props.classCart);
        this.setState({courseAdded:true});
    }

    removeCourseClass(){
        this.props.handleCourseClassRemove(this.props.classCart);
        this.setState({courseAdded:false});
    }


    render() {

        const button = this.props.courseAdded === true ?
            <Button onClick={this.removeCourseClass} size={"sm"}>Remove Class</Button> :
            <Button onClick={this.addCourseClass} size={"sm"}>Add Class</Button> ;

        const course = this.props.classCart.courseClass;
        const asString = course.asString.split(" ");
        const courseString = asString[0]+" "+asString[1];
        const courseClassString = asString[2]+" "+asString[3];

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