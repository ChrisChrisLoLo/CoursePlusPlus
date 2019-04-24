import React from "react";
import {
    Row,
    Col
} from 'reactstrap';
import axios from "axios/index";
import ClassCart from "./ClassCart/ClassCart"
import ScheduleGrid from "./ScheduleGrid/ScheduleGrid"

export default class ScheduleBuilderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {coursesSelected:[]}
        this.handleCourseClassAdd = this.handleCourseClassAdd.bind(this);
        this.handleCourseClassRemove = this.handleCourseClassRemove.bind(this);
    }

    handleCourseClassAdd(courseClassProp){
        const newList = this.state.coursesSelected.concat(courseClassProp);
        this.setState({coursesSelected:newList});
    }

    handleCourseClassRemove(courseClassProp){
        const newList = this.state.coursesSelected.filter((courseClass) => {
            return courseClass.id !== courseClassProp.id;
        });
        this.setState({coursesSelected:newList});
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h3>Schedule Builder</h3>
                    </Col>
                </Row>
                <Row>
                    <Col sm={"3"}>
                        <ClassCart handleCourseClassAdd={this.handleCourseClassAdd} handleCourseClassRemove={this.handleCourseClassRemove}/>
                    </Col>
                    <Col sm={"9"}>
                        <ScheduleGrid courses={this.state.coursesSelected}/>
                    </Col>
                </Row>
            </div>
        );
    }
}