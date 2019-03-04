import React from "react";
import {
	Row,
	Col
} from 'reactstrap';

import CourseListForm from "./CourseListForm.js";
import SearchResults from "./SearchResults.js";
import CourseSingleForm from "./CourseSingleForm.js";

export default class SearchPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { subjCode: "", courseNum: "" };
		this.onSubjChange = this.onSubjChange.bind(this);
		this.onCourseChange = this.onCourseChange.bind(this);
		this.onSingleCourseSubmit = this.onSingleCourseSubmit.bind(this);
	}

	onSubjChange(event) {
		this.setState({ subjCode: event.target.value });
	}
	onCourseChange(event) {
		this.setState({ courseNum: event.target.value });
	}
	onSingleCourseSubmit(event) {
		let queryRequest = this.state.subjCode.toUpperCase() + " " + this.state.courseNum.toString()
		console.log(queryRequest);

		event.preventDefault();
	}


	render() {
		return (
			<div>
				<Row>
					<Col>
						<h3>Search</h3>
					</Col>
				</Row>
				<Row>
					<Col sm="3">
						<CourseSingleForm
							subjCode={this.state.subjCode}
							courseNum={this.state.courseNum}
							onSubjChange={this.onSubjChange}
							onCourseChange={this.onCourseChange}
							onSingleCourseSubmit={this.onSingleCourseSubmit}
						/>
						<CourseListForm />
					</Col>
					<Col sm="9">
						<SearchResults />
					</Col>
				</Row>
			</div>
		);
	}
}