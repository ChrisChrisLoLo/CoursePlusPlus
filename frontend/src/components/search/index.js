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
		this.calcPaginationURL = this.calcPaginationURL.bind(this);
	}

	onSubjChange(event) {
		this.setState({ subjCode: event.target.value });
	}
	onCourseChange(event) {
		this.setState({ courseNum: event.target.value });
	}
	onSingleCourseSubmit(event) {

		let queryRequest = this.state.subjCode.toUpperCase() + "%20" + this.state.courseNum.toString()
		console.log(queryRequest);


		this.props.history.push("/search/?asString=" + queryRequest);

		axios.get(process.env.REACT_APP_API_URL + "/api/courses/?asString=" + queryRequest)
			.then(res => {
				const coursesData = res.data;
				this.setState({ courseListData: coursesData });
			})
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
		// console.log("PROPS: ");
		// console.log(this.props);
		// axios.get(process.env.REACT_APP_API_URL + "/api/courses/" + this.props.queryParams)
		// 	.then(res => {
		// 		const coursesData = res.data;
		// 		this.setState({ courseListData: coursesData });
		// 	})
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
							onSubjChange={this.onSubjChange}
							onCourseChange={this.onCourseChange}
							onSingleCourseSubmit={this.onSingleCourseSubmit}
						/>
						<CourseListForm />
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