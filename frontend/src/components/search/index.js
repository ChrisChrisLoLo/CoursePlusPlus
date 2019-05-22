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
		this.state = { courseListData: null , specificTerm: null };
		this.onSingleCourseSubmit = this.onSingleCourseSubmit.bind(this);
		this.onMultiCourseSubmit = this.onMultiCourseSubmit.bind(this);
		this.changePaginationURL = this.changePaginationURL.bind(this);
		this.resultsRef = React.createRef();
		console.log("resultRefInit");
		console.log(this.resultsRef);
	}

	onSingleCourseSubmit(event, subjCode, courseNum) {

		let queryRequest = subjCode.toUpperCase() + "%20" + courseNum.toString()
		console.log(queryRequest);

		this.props.history.push("/search/?asString=" + queryRequest);

		axios.get(process.env.REACT_APP_API_URL + "/api/courses/?asString=" + queryRequest)
			.then(res => {
				const coursesData = res.data;
				this.setState({ courseListData: coursesData, specificTerm: null });
			});
		event.preventDefault();
	}

	onMultiCourseSubmit(event, subjNum, termNum, minCourse, maxCourse) {
		const queryRequest = "subject=" + subjNum + "&"
			+ "termNum=" + termNum + "&"
			+ "minCourse=" + minCourse + "&"
			+ "maxCourse=" + maxCourse;
		console.log(queryRequest);

		this.props.history.push("/search/?" + queryRequest);

		axios.get(process.env.REACT_APP_API_URL + "/api/courses/?" + queryRequest)
			.then(res => {
				const coursesData = res.data;
				this.setState({ courseListData: coursesData, specificTerm: termNum});
			});
		event.preventDefault();
	}

	changePaginationURL(paginationURL) {
		// let searchParams = this.props.location.search || "?";
		// console.log(this.props.location);
		// let curURL = this.props.location.pathname + "?";// + searchParams;
		// console.log(curURL);

		const queryRegExp = new RegExp("(\\?.*)");
		const pageQuery = paginationURL.match(queryRegExp);
		const outputPageQuery = pageQuery ? pageQuery[0] : "";
		this.props.history.push("/search/" + outputPageQuery);
	}

	componentDidMount() {
		//const queryRegex = new RegExp("[?].*");
		//const queryParams = window.location.href.match(queryRegex) || "";
		console.log(process.env);
		axios.get(process.env.REACT_APP_API_URL + "/api/courses/" + this.props.location.search)
			.then(res => {
				const coursesData = res.data;
				this.setState({ courseListData: coursesData });
			});
	}

	componentDidUpdate(prevProps){
		//Scroll to top whenever more results are loaded.
		console.log("resultsRef:");
		console.log(this.resultsRef.current.offsetTop);
		window.scrollTo(0, this.resultsRef.current.offsetTop);
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
			<div className={"my-2"}>
				<Row>
					<Col>
							<h3 className={"font-title"}>Search</h3>
					</Col>
				</Row>
				<Row>
					<Col sm="3">
						<div className={"sticky-with-header"}>
							<CourseSingleForm
								subjCode={this.state.subjCode}
								courseNum={this.state.courseNum}
								onSingleCourseSubmit={this.onSingleCourseSubmit}
							/>
							<CourseListForm
								onMultiCourseSubmit={this.onMultiCourseSubmit}
							/>
						</div>
					</Col>
					<Col sm="9" >
						<div>
							<SearchResults
								courseListData={this.state.courseListData}
								changePaginationURL={this.changePaginationURL}
								specificTerm={this.state.specificTerm}
								refProp={this.resultsRef}
							/>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}