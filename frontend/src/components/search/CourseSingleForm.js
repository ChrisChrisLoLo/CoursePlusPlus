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
        this.handleSubjChange = this.handleSubjChange.bind(this);
        this.handleCourseChange = this.handleCourseChange.bind(this);
        this.handleSingleCourseSubmit = this.handleSingleCourseSubmit.bind(this);
    }

    handleSubjChange(event) {
        this.props.onSubjChange(event);
    }
    handleCourseChange(event) {
        this.props.onCourseChange(event);
    }
    handleSingleCourseSubmit(event) {
        this.props.onSingleCourseSubmit(event);
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
                                value={this.props.subjCode}
                                onChange={this.handleSubjChange}
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
                                value={this.props.courseNum}
                                onChange={this.handleCourseChange}
                            />

                        </FormGroup>
                        <Button onClick={this.handleSingleCourseSubmit} >Search</Button>
                    </Form>

                </CardBody>
            </Card>
        );
    }
}