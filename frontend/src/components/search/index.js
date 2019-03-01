import React from "react";
import {
	Row,
	Col
} from 'reactstrap';

import CourseListForm from "./CourseListForm.js";
import SearchResults from "./SearchResults.js";
import CourseSingleForm from "./CourseSingleForm.js";

export default class SearchPage extends React.Component {
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
						<CourseSingleForm />
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