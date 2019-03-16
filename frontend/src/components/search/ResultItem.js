import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
    Collapse,

} from 'reactstrap';
import axios from "axios";

export default class ResultItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cardOpen: false, courseClassData: null };
        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen(e) {
        if (!this.state.courseClassData) {
            axios.get(process.env.REACT_APP_API_URL + "/api/classes/?course=" + this.props.course.id)
                .then(res => {
                    const courseClassResData = res.data;
                    this.setState({ courseClassData: courseClassResData });
                });
        }
        this.setState({ cardOpen: !this.state.cardOpen });
    }

    render() {
        const course = this.props.course;
        let results;
        let output;
        const data = this.state.courseClassData;

        if (data) {
            results = data.results;
            if (results === undefined || results.length === 0) {
                output = <p>No Classes Found.</p>
            }
            else {
                output = results.map((courseClass) =>
                    <Card key={courseClass.id}>
                        <CardHeader>{courseClass.calendarCode}</CardHeader>
                        <CardBody>
                            <p>{courseClass.startDate}</p>
                            <p>{courseClass.endDate}</p>
                            <CardText>{courseClass.description || "No description available."}</CardText>
                        </CardBody>
                    </Card>
                );
            }
        }

        return (
            <Card>
                <CardHeader>{course.asString}</CardHeader>
                <CardBody>
                    <h5>{course.title}</h5>
                    <CardText>{course.description || "No description available."}</CardText>
                    <Button onClick={this.toggleOpen} size="sm">Classes</Button>
                    <Collapse isOpen={this.state.cardOpen}>
                        {output}
                    </Collapse>
                </CardBody>
            </Card>
        );
    }
}