import React from "react";
import {
    Row,
    Col
} from 'reactstrap';
import axios from "axios/index";
import ClassCart from "./ClassCart/ClassCart";
import TermSelect from "./ClassCart/TermSelect";
import ScheduleGrid from "./ScheduleGrid/ScheduleGrid";

export default class ScheduleBuilderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {coursesSelected:[],chosenTerm:""};
        this.handleCourseClassAdd = this.handleCourseClassAdd.bind(this);
        this.handleCourseClassRemove = this.handleCourseClassRemove.bind(this);
        this.handleChosenTermChange = this.handleChosenTermChange.bind(this);
        this.setChosenTerm = this.setChosenTerm.bind(this);
        this.setCoursesSelected = this.setCoursesSelected.bind(this);
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

    handleChosenTermChange(e){
        this.setState({chosenTerm:e.target.value});
    }

    setChosenTerm(term){
        this.setState({chosenTerm:term});
    }

    setCoursesSelected(newCoursesSelected){
        this.setState({coursesSelected:newCoursesSelected});
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
                        <TermSelect handleChosenTermChange={this.handleChosenTermChange} setChosenTerm={this.setChosenTerm} chosenTerm={this.state.chosenTerm} setCoursesSelected={this.setCoursesSelected}/>
                        <ClassCart handleCourseClassAdd={this.handleCourseClassAdd} handleCourseClassRemove={this.handleCourseClassRemove} chosenTerm={this.state.chosenTerm}/>
                    </Col>
                    <Col sm={"9"}>
                        <ScheduleGrid courseClasses={this.state.coursesSelected}/>
                    </Col>
                </Row>
            </div>
        );
    }
}