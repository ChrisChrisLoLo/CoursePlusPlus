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

    getSingleCourse() {
        console.log("HIIIIIIII")
    }

    render() {
        return (
            <Card>
                <CardHeader><h5>Find a specific course:</h5></CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            {/* <Label for="SubjectCode"></Label> */}
                            <Input type="text" name="subjCode" id="subjectCode" placeholder="COURS" />
                        </FormGroup>
                        <FormGroup>
                            {/* <Label for="exampleText">Text Area</Label> */}
                            <Input type="text" name="courseNum" id="courseNum" placeholder="101" />

                        </FormGroup>
                        <Button onClick={this.getSingleCourse} >Search</Button>
                    </Form>

                </CardBody>
            </Card>
        );
    }
}