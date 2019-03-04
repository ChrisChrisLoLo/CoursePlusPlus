import React from "react";
import {
	Row,
	Col,
	Container,
} from 'reactstrap';

import ResultItem from "./ResultItem"

export default class SearchResults extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//Scroll to top whenever more results are loaded.
		//window.scrollTo(0, 0)

	}

	render() {
		console.log(this.props.courseListData)
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
			if (results === undefined || results.length == 0) {
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
		console.log(results)
		return (
			<div>
				<Container>
					{data &&
						<Row className="justify-content-between">
							<Col sm={{ size: 'auto' }}>
								<p>{data.count} Results Found</p>
							</Col>
							<Col sm={{ size: 'auto' }}>
								<p>HI</p>
							</Col>
						</Row>
					}
					{output}
				</Container>
			</div>
		);
	}
}