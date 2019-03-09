import React from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Form,
	FormGroup,
	Label,
	Col,
	Input,
} from "reactstrap";
import axios from "axios";
export default class CourseListForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = { subjData: null }
	}

	componentDidMount() {
		axios.get(process.env.REACT_APP_API_URL + "/api/subjects/")
			.then(res => {
				const data = res.data;
				this.setState({ subjData: data });
			})
	}

	render() {
		let subjOptions;
		if (this.state.subjData) {
			const subject = this.state.subjData.results;
			subjOptions = subject.map((subject) =>
				<option value={subject.id}>{subject.code + " - " + subject.name}</option>
			);
		}
		return (
			<Card>
				<CardHeader>
					<h5>Search based on criteria:</h5>
				</CardHeader>
				<CardBody>
					<Form>
						<FormGroup>
							<Label for="subjectSelect">Subject</Label>
							<Input type="select" name="subject" id="subjectSelect">
								{subjOptions}
							</Input>
						</FormGroup>

						<FormGroup>
							<Label for="minCourseNum">Min Course Number</Label>
							<Input type="select" name="minCourseNum" id="minCourseNum">
								<option selected>100</option>
								<option>200</option>
								<option>300</option>
								<option>400</option>
								<option>500</option>
								<option>600</option>
								<option>700</option>
								<option>800</option>
								<option>900</option>
								<option>1000</option>
							</Input>
						</FormGroup>

						<FormGroup>
							<Label for="maxCourseNum">Max Course Number</Label>
							<Input type="select" name="maxCourseNum" id="maxCourseNum">
								<option>100</option>
								<option>200</option>
								<option>300</option>
								<option>400</option>
								<option>500</option>
								<option>600</option>
								<option>700</option>
								<option>800</option>
								<option>900</option>
								<option selected>1000</option>
							</Input>
						</FormGroup>

						<Button onClick={""}>Search</Button>
					</Form>
				</CardBody>
			</Card>
		);
	}
}