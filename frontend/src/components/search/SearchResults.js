import React from "react";
import {
	Col,
	Card,
	CardBody,
} from 'reactstrap';
import axios from "axios";

export default class SearchResults extends React.Component {
	state = {
		persons: []
	}

	componentDidMount() {
		axios.get("https://jsonplaceholder.typicode.com/users")
			.then(res => {
				const persons = res.data;
				this.setState({ persons });
			})
	}
	render() {
		return (
			<div>
				<h3>Results</h3>
				<ul>
					{this.state.persons.map(person => <li>{person.name}</li>)}
				</ul>
				<Col sm="9">

				</Col>
			</div>
		);
	}
}