import React from "react";
import {
	Row,
	Col
} from 'reactstrap';
import axios from "axios";

import CourseListForm from "./CourseListForm.js";
import SearchResults from "./SearchResults.js";
import CourseSingleForm from "./CourseSingleForm.js";

export default class SearchPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { subjCode: "", courseNum: "", courseListData: null };
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
		axios.get(process.env.REACT_APP_API_URL + "/api/courses/?asString=" + queryRequest)
			.then(res => {
				const coursesData = res.data;
				this.setState({ courseListData: coursesData });
			})
		event.preventDefault();
	}

	componentDidMount() {
		//Scroll to top whenever more results are loaded.
		//window.scrollTo(0, 0)
		console.log(process.env);
		axios.get(process.env.REACT_APP_API_URL + "/api/courses/")
			.then(res => {
				const coursesData = res.data;
				this.setState({ courseListData: coursesData });
			})
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
						<SearchResults
							courseListData={this.state.courseListData}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}