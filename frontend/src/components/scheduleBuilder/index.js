import React from "react";
import {
  Alert,
  Row,
  Col
} from 'reactstrap';
import ClassCart from "./ClassCart/ClassCart";
import TermSelect from "./ClassCart/TermSelect";
import ScheduleGrid from "./ScheduleGrid/ScheduleGrid";
import isAuthenticated from "../../userLib/isAuthenticated";

export default class ScheduleBuilderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {coursesSelected: [], coursePreviewed: null, chosenTerm: ""};
    this.handleCourseClassAdd = this.handleCourseClassAdd.bind(this);
    this.handleCourseClassRemove = this.handleCourseClassRemove.bind(this);
    this.handleChosenTermChange = this.handleChosenTermChange.bind(this);
    this.setChosenTerm = this.setChosenTerm.bind(this);
    this.setCoursesSelected = this.setCoursesSelected.bind(this);
    this.setCoursePreviewed = this.setCoursePreviewed.bind(this);
  }

  handleCourseClassAdd(courseClassProp) {
    const newList = this.state.coursesSelected.concat(courseClassProp);
    this.setState({coursesSelected: newList});
  }

  handleCourseClassRemove(courseClassProp) {
    const newList = this.state.coursesSelected.filter((courseClass) => {
      return courseClass.id !== courseClassProp.id;
    });
    this.setState({coursesSelected: newList});
  }

  handleChosenTermChange(e) {
    this.setState({chosenTerm: e.target.value});
    window.localStorage.setItem("chosenTerm", e.target.value);
  }

  setChosenTerm(term) {
    this.setState({chosenTerm: term});
  }

  setCoursesSelected(newCoursesSelected) {
    this.setState({coursesSelected: newCoursesSelected});
  }

  setCoursePreviewed(course){
    this.setState({coursePreviewed:course});
  }

  render() {
    return (
      <div className={"my-2"}>
        {!isAuthenticated() &&
					<Row>
						<Col>
							<Alert color={"warning"}>
								You are not currently logged in, meaning all changes are local.
								Log in to save your courses online.
							</Alert>
						</Col>
					</Row>
				}
        <Row>
          <Col>
            <h3 className={"font-title"}>Schedule Builder</h3>
          </Col>
        </Row>
        <Row>
          <Col sm={"3"}>
            <TermSelect handleChosenTermChange={this.handleChosenTermChange}
                        setChosenTerm={this.setChosenTerm}
                        chosenTerm={this.state.chosenTerm}
                        setCoursesSelected={this.setCoursesSelected}/>
            <ClassCart coursesSelected={this.state.coursesSelected}
                       setCoursesSelected={this.setCoursesSelected}
                       handleCourseClassAdd={this.handleCourseClassAdd}
                       handleCourseClassRemove={this.handleCourseClassRemove}
                       setCoursePreviewed={this.setCoursePreviewed}
                       chosenTerm={this.state.chosenTerm}/>
          </Col>
          <Col sm={"9"}>
            <ScheduleGrid classCart={this.state.coursesSelected} classPreviewed={this.state.coursePreviewed}/>
          </Col>
        </Row>
      </div>
    );
  }
}