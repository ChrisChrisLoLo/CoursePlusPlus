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
		this.state = { subjData: null, chosenSubj: "1", minCourse: "100", maxCourse: "1000" };
		this.onChosenSubjChange = this.onChosenSubjChange.bind(this);
		this.onMinCourseChange = this.onMinCourseChange.bind(this);
		this.onMaxCourseChange = this.onMaxCourseChange.bind(this);
	}

	onChosenSubjChange(e) {
		this.setState({ chosenSubj: e.target.value });
	}
	onMinCourseChange(e) {
		this.setState({ minCourse: e.target.value });
	}
	onMaxCourseChange(e) {
		this.setState({ maxCourse: e.target.value });
	}

	componentDidMount() {
		axios.get(process.env.REACT_APP_API_URL + "/api/subjects/")
			.then(res => {
				const data = res.data;
				this.setState({ subjData: data });
			})
	}
	handleMultiCourseSubmit(event) {
		this.props.onMultiCourseSubmit(event, this.state.chosenSubj, this.state.minCourse, this.state.maxCourse);
	}


	render() {
		let subjOptions;
		if (this.state.subjData) {
			const subject = this.state.subjData.results;
			subjOptions = subject.map((subject) =>
				<option value={subject.id} key={subject.id}>{subject.code + " - " + subject.name}</option>
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
							<Input type="select" name="subject" id="subjectSelect" onChange={this.onChosenSubjChange} value={this.state.chosenSubj}>
								{subjOptions}
							</Input>
						</FormGroup>

						<FormGroup>
							<Label for="minCourse">Min Course Number</Label>
							<Input type="select" name="minCourse" id="minCourse" onChange={this.onMinCourseChange} value={this.state.minCourse}>
								<option>100</option>
								<option>200</option>
								<option>300</option>
								<option>400</option>
								<option>500</option>
								<option>600</option>
								<option>700</option>
								<option>800</option>
								<option>900</option>
								<option>999</option>
							</Input>
						</FormGroup>

						<FormGroup>
							<Label for="maxCourse">Max Course Number</Label>
							<Input type="select" name="maxCourse" id="maxCourse" onChange={this.onMaxCourseChange} value={this.state.maxCourse}>
								<option>100</option>
								<option>200</option>
								<option>300</option>
								<option>400</option>
								<option>500</option>
								<option>600</option>
								<option>700</option>
								<option>800</option>
								<option>900</option>
								<option>999</option>
							</Input>
						</FormGroup>

						<Button onClick={(event) => this.handleMultiCourseSubmit(event)}>Search</Button>
					</Form>
				</CardBody>
			</Card>
		);
	}
}