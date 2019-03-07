import React from "react";
import {
	Button,
	Row,
	Col,
	Container,
} from 'reactstrap';
import {
	withRouter,
} from 'react-router-dom';

import PropTypes from "prop-types";
import ResultItem from "./ResultItem"

export default class SearchResults extends React.Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	componentDidMount() {
		//Scroll to top whenever more results are loaded.
		//window.scrollTo(0, 0)

	}

	//Take the pagination URL from the API and push the given page to the react router history.
	calcPaginationURL(paginationURL) {
		console.log(this.props);
		if (!paginationURL) return;

		let searchParams = this.props.search || "?";
		let curURL = this.props.location + searchParams;

		let queryRegExp = new RegExp("(page=)[0-9]+");
		let pageQuery = paginationURL.match(queryRegExp);
		this.props.history.push(curURL + pageQuery);
	}

	render() {
		//console.log(this.props.courseListData.next)
		// const resultsList = this.props.courseListData.results.map((course) =>
		// 	<ResultItem />
		// );
		let results;
		let output;
		let data = this.props.courseListData;
		if (data) {
			results = data.results;

			//If empty
			if (results === undefined || results.length === 0) {
				output = <h3>No Results Found.</h3>
			}
			else {
				output = results.map((course) =>
					<ResultItem course={course} key={course.id} />
				);
			}
		}
		else {
			output = <h3>Loading...</h3>;
		}
		return (
			<div>
				<Container fluid={true}>
					{data &&
						<Row className="justify-content-between">
							<Col sm={{ size: 'auto' }}>
							</Col>
							<Col sm={{ size: 'auto' }}>
								<p>{data.count} Results Found</p>
							</Col>
						</Row>
					}

					{output}

					{data &&
						<Row className="justify-content-between">
							<Col sm={{ size: 'auto' }}>
								{data.previous &&
									<Button color="primary" onClick={this.calcPaginationURL(data.prev)}>Prev</Button>
								}
							</Col>
							<Col sm={{ size: 'auto' }}>
								{data.next &&
									<Button color="primary" onClick={this.calcPaginationURL(data.next)}>Next</Button>
								}
							</Col>
						</Row>
					}
				</Container>
			</div>
		);
	}
}

