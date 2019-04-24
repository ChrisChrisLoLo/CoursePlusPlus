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
        this.handleCourseClassAdd = this.handleCourseClassAdd.bind();
        this.handleCourseClassRemove = this.handleCourseClassRemove.bind();
    }

    handleCourseClassAdd(e,courseClassProp){
        const newList = this.state.coursesSelected.append(courseClassProp);
        this.setState({coursesSelected:newList});
    }

    handleCourseClassRemove(e,courseClassProp){
        const newList = this.state.coursesSelected.filter((courseClass) => {
            return courseClass.id !== courseClassProp.id;
        });
        this.setState({coursesSelected:newList});
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <Row>
                    <Col>
                        <h3>Schedule Builder</h3>
                    </Col>
                </Row>
                <Row>
                    <Col sm={"3"}>
                        <ClassCart/>
                    </Col>
                    <Col sm={"9"}>
                        <ScheduleGrid/>
                    </Col>
                </Row>
            </div>
        );
    }
}