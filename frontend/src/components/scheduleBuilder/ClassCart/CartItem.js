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
        this.state = {courseAdded:false};
        this.addCourseClass = this.addCourseClass.bind(this);
        this.removeCourseClass = this.removeCourseClass.bind(this);
    }

    addCourseClass(){
        this.props.handleCourseClassAdd(this.props.course);
        this.setState({courseAdded:true});
    }

    removeCourseClass(){
        this.props.handleCourseClassRemove(this.props.course);
        this.setState({courseAdded:false});
    }


    render() {

        const button = this.state.courseAdded ?
            <Button onClick={this.removeCourseClass}>Remove Class</Button> :
            <Button onClick={this.addCourseClass}>Add Class</Button> ;

        const course = this.props.course;
        const asString = course.asString.split(" ");
        const courseString = asString[0]+" "+asString[1];
        const courseClassString = asString[2]+" "+asString[3];

        return (
            <Card>
                <p>{courseString}</p>
                <p>{courseClassString}</p>
                <p>{course.id}</p>
                {button}
            </Card>
        );
    }
}