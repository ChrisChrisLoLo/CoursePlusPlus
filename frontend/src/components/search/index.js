import React from "react";
import {
	Row,
	Col
} from 'reactstrap';

import SearchForm from "./SearchForm.js";
import SearchResults from "./SearchResults.js";

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
					<SearchForm />
					<SearchResults />
				</Row>
			</div>
		);
	}
}