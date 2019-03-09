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
        this.state = { subjCode: "", courseNum: "" }
        this.onSubjChange = this.onSubjChange.bind(this);
        this.onCourseChange = this.onCourseChange.bind(this);
        this.handleSingleCourseSubmit = this.handleSingleCourseSubmit.bind(this);
    }

    onSubjChange(event) {
        this.setState({ subjCode: event.target.value });
    }
    onCourseChange(event) {
        this.setState({ courseNum: event.target.value });
    }
    handleSingleCourseSubmit(event, subjCode, courseNum) {
        console.log(subjCode, courseNum);
        this.props.onSingleCourseSubmit(event, subjCode, courseNum);
    }


    render() {
        return (
            <Card>
                <CardHeader><h5>Find a specific course:</h5></CardHeader>
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
                            />

                        </FormGroup>
                        <Button onClick={(event) => this.handleSingleCourseSubmit(event, this.state.subjCode, this.state.courseNum)} >Search</Button>
                    </Form>

                </CardBody>
            </Card>
        );
    }
}