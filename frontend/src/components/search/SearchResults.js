import React from "react";
import {
	Col,
	Card,
	CardBody,
} from 'reactstrap';
import axios from "axios";

export default class SearchResults extends React.Component {
	state = {
		coursesData: null
	}

	componentDidMount() {
		console.log(process.env);
		axios.get(process.env.REACT_APP_API_URL + "/api/courses/")
			.then(res => {
				const coursesData = res.data;
				this.setState({ coursesData });
			})
	}
	render() {
		return (
			<div>
				<h3>Results</h3>


			</div>
		);
	}
}