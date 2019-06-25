import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

export default class CourseSingleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {subjCode: "", courseNum: ""};
    this.onSubjChange = this.onSubjChange.bind(this);
    this.onCourseChange = this.onCourseChange.bind(this);
    this.handleSingleCourseSubmit = this.handleSingleCourseSubmit.bind(this);
    this.handleKeyPressSubmit = this.handleKeyPressSubmit.bind(this);
  }

  onSubjChange(event) {
    this.setState({subjCode: event.target.value});
  }

  onCourseChange(event) {
    this.setState({courseNum: event.target.value});
  }

  handleSingleCourseSubmit(event) {
    this.props.onSingleCourseSubmit(event, this.state.subjCode, this.state.courseNum);
  }

  handleKeyPressSubmit(event){
    if (event.key == "Enter"){
          this.props.onSingleCourseSubmit(event, this.state.subjCode, this.state.courseNum);
    }
  }


  render() {
    return (
      <Card>
        <CardHeader><h5 className={"font-title"}>Find a specific course:</h5></CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              {/* <Label for="SubjectCode"></Label> */}
              <Input
                type="text"
                name="subjCode"
                id="subjectCode"
                maxLength={5}
                placeholder="COURS"
                value={this.state.subjCode}
                onChange={this.onSubjChange}
                onKeyPress={this.handleKeyPressSubmit}
              />
            </FormGroup>
            <FormGroup>
              {/* <Label for="exampleText">Text Area</Label> */}
              <Input
                type="number"
                name="courseNum"
                id="courseNum"
                max={999}
                min={100}
                placeholder="101"
                value={this.state.courseNum}
                onChange={this.onCourseChange}
                onKeyPress={this.handleKeyPressSubmit}
              />
            </FormGroup>
            <Button onClick={(e) => this.handleSingleCourseSubmit(e)}
                    color={"primary"}> Search</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}