import React from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import axios from "axios";
export default class CourseListForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = { subjData: null, chosenSubj: "", termData: null, chosenTerm: "", minCourse: "100", maxCourse: "999" };
		this.onChosenSubjChange = this.onChosenSubjChange.bind(this);
		this.onChosenTermChange = this.onChosenTermChange.bind(this);
		this.onMinCourseChange = this.onMinCourseChange.bind(this);
		this.onMaxCourseChange = this.onMaxCourseChange.bind(this);
	}

	onChosenSubjChange(e) {
		this.setState({ chosenSubj: e.target.value });
	}
	onChosenTermChange(e) {
		this.setState({ chosenTerm: e.target.value });
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
		axios.get(process.env.REACT_APP_API_URL + "/api/terms/")
			.then(res => {
				const data = res.data;
				this.setState({ termData: data });
			})
	}
	handleMultiCourseSubmit(event) {
		this.props.onMultiCourseSubmit(event, this.state.chosenSubj, this.state.chosenTerm, this.state.minCourse, this.state.maxCourse);
	}


	render() {
		let subjOptions;
		if (this.state.subjData && this.state.subjData.results) {
			const subject = this.state.subjData.results;
			subjOptions = subject.map((subject) =>
				<option value={subject.id} key={subject.id}>{subject.code + " - " + subject.name}</option>
			);
		}

		let termOptions;
		if (this.state.termData && this.state.termData.results) {
			const term = this.state.termData.results;
			termOptions = term.map((term) =>
				<option value={term.id} key={term.id}>{term.title}</option>
			);
		}

		return (
			<Card>
				<CardHeader>
					<h5 className={"font-title"}>Search based on criteria:</h5>
				</CardHeader>
				<CardBody>
					<Form>
						<FormGroup>
							<Label for="termSelect">Term</Label>
							<Input type="select" name="term" id="termSelect" onChange={this.onChosenTermChange} value={this.state.chosenTerm}>
								<option value="">All Terms</option>
								{termOptions}
							</Input>
						</FormGroup>

						<FormGroup>
							<Label for="subjectSelect">Subject</Label>
							<Input type="select" name="subject" id="subjectSelect" onChange={this.onChosenSubjChange} value={this.state.chosenSubj}>
								<option value="">All Subjects</option>
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

						<Button onClick={(event) => this.handleMultiCourseSubmit(event)} color={"primary"}>Search</Button>
					</Form>
				</CardBody>
			</Card >
		);
	}
}