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
		this.state = { courseListData: null };
		this.onSingleCourseSubmit = this.onSingleCourseSubmit.bind(this);
		this.onMultiCourseSubmit = this.onMultiCourseSubmit.bind(this);
		this.calcPaginationURL = this.calcPaginationURL.bind(this);
	}

	onSingleCourseSubmit(event, subjCode, courseNum) {

		let queryRequest = subjCode.toUpperCase() + "%20" + courseNum.toString()
		console.log(queryRequest);

		this.props.history.push("/search/?asString=" + queryRequest);

		axios.get(process.env.REACT_APP_API_URL + "/api/courses/?asString=" + queryRequest)
			.then(res => {
				const coursesData = res.data;
				this.setState({ courseListData: coursesData });
			})
		event.preventDefault();
	}

	onMultiCourseSubmit(event) {
		// let queryRequest = subjCode.toUpperCase() + "%20" + courseNum.toString()
		// console.log(queryRequest);

		// this.props.history.push("/search/?asString=" + queryRequest);

		// axios.get(process.env.REACT_APP_API_URL + "/api/courses/?asString=" + queryRequest)
		// 	.then(res => {
		// 		const coursesData = res.data;
		// 		this.setState({ courseListData: coursesData });
		// 	})
		event.preventDefault();
	}

	calcPaginationURL(paginationURL) {
		let searchParams = this.props.location.search || "?";
		console.log(this.props.location);
		let curURL = this.props.location.pathname + "?";// + searchParams;
		console.log(curURL);

		let queryRegExp = new RegExp("(page=)[0-9]+");
		let pageQuery = paginationURL.match(queryRegExp);
		let outputPageQuery = pageQuery ? pageQuery[0] : "";
		this.props.history.push(curURL + outputPageQuery);
	}

	componentDidMount() {
		//const queryRegex = new RegExp("[?].*");
		//const queryParams = window.location.href.match(queryRegex) || "";
		console.log(process.env);
		axios.get(process.env.REACT_APP_API_URL + "/api/courses/" + this.props.location.search)
			.then(res => {
				const coursesData = res.data;
				this.setState({ courseListData: coursesData });
			})
	}

	componentDidUpdate(prevProps) {
		//Scroll to top whenever more results are loaded.
		window.scrollTo(0, 0)
		console.log(this.props);
		console.log(prevProps);
		if (this.props.location.search !== prevProps.location.search) {
			axios.get(process.env.REACT_APP_API_URL + "/api/courses/" + this.props.location.search)
				.then(res => {
					const coursesData = res.data;
					this.setState({ courseListData: coursesData });
				})
		}
	}


	render() {
		console.log(this.state);
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
							onSingleCourseSubmit={this.onSingleCourseSubmit}
						/>
						<CourseListForm
							onMultiCourseSubmit={this.onMultiCourseSubmit}
						/>
					</Col>
					<Col sm="9">
						<SearchResults
							courseListData={this.state.courseListData}
							calcPaginationURL={this.calcPaginationURL}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}