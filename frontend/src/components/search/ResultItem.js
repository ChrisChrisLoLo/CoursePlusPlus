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
            axios.get(process.env.REACT_APP_API_URL + "/api/classes/")
                .then(res => {
                    const courseClassResData = res.data;
                    this.setState({ courseClassData: courseClassResData });
                })
            this.setState({ cardOpen: !this.state.cardOpen });
        }
    }

    render() {
        const course = this.props.course;
        return (
            <Card>
                <CardHeader>{course.asString}</CardHeader>
                <CardBody>
                    <h5>{course.title}</h5>
                    <CardText>{course.description || "No description available."}</CardText>
                    <Button onClick={this.toggleOpen} size="sm">Classes</Button>
                    <Collapse isOpen={this.state.cardOpen}>
                        <h3>HIIIIIIII</h3>
                    </Collapse>
                </CardBody>

            </Card>
        );
    }
}