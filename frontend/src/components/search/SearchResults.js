import React from "react";
import {
} from 'reactstrap';

import ResultItem from "./ResultItem"

export default class SearchResults extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.courseListData)
		//console.log(this.props.courseListData.next)
		// const resultsList = this.props.courseListData.results.map((course) =>
		// 	<ResultItem />
		// );
		let results;
		if (this.props.courseListData) {

			results = this.props.courseListData.results;
			//If empty
			if (results === undefined || results.length == 0) {
				results = <h3>No Results Found.</h3>
			}
			else {
				results = results.map((course) =>
					<ResultItem course={course} key={course.id} />
				);
			}
		}
		else {
			results = <h3>Loading...</h3>;
		}
		return (
			<div>
				{results}
			</div>
		);
	}
}