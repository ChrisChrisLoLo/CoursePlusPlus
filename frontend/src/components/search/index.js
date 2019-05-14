import React from "react";
import {
	Row,
	Col
} from 'reactstrap';
import axios from "axios";

import CourseListForm from "./CourseListForm.js";
import SearchResults from "./SearchResults.js";
import CourseSingleForm from "./CourseSingleForm.js";
import isAuthenticated from "../../userLib/isAuthenticated";
import getAuthToken from "../../userLib/getAuthToken";

export default class SearchPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { courseListData: null , specificTerm: null , classCartMap: {} };
		this.onSingleCourseSubmit = this.onSingleCourseSubmit.bind(this);
		this.onMultiCourseSubmit = this.onMultiCourseSubmit.bind(this);
		this.changePaginationURL = this.changePaginationURL.bind(this);
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

		//Get all courseCarts associated to the user.
		//The request is made here to avoid multiple requests to check if a class is in the cart
		if(isAuthenticated()) {
			axios.get(process.env.REACT_APP_API_URL + "/api/classCart/", {
                    headers: {Authorization: getAuthToken()}
                }).then((res) => {
                	const classCartMap = {};
                	if(res.data.results){
                		console.log(res.data.results);
						res.data.results.forEach((classCartItem)=>{
							classCartMap[classCartItem.id] = true;
						})
					}
					this.setState({classCartMap: classCartMap});
				});
		}
	}

	componentDidUpdate(prevProps){
		//Scroll to top whenever more results are loaded.
		window.scrollTo(0, 0);
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
							changePaginationURL={this.changePaginationURL}
							specificTerm={this.state.specificTerm}
							courseClassMap={this.state.classCartMap}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}