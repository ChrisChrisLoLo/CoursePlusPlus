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

import ResultItemClass from "./ResultItemClass";
import ButtonGroup from "reactstrap/es/ButtonGroup";

export default class ResultItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cardOpen: false, descOpen: false, courseClassData: null };
        this.toggleOpen = this.toggleOpen.bind(this);
        this.toggleDesc = this.toggleDesc.bind(this);
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

    toggleDesc(){
        this.setState({descOpen:!this.state.descOpen});
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
                    <ResultItemClass courseClass={courseClass} key={courseClass.id}/>
                );
            }
        }

        return (
            <Card>
                <CardHeader>{course.asString}</CardHeader>
                <CardBody>


                    <h5>{course.title}</h5>
                    <Button onClick={this.toggleDesc} size="sm">Desc</Button>


                    <Collapse isOpen={this.state.descOpen}>
                        <CardText className={"small"}>{course.description || "No description available."}</CardText>
                    </Collapse>


                    <Button onClick={this.toggleOpen} size="sm">Classes</Button>
                    <Collapse isOpen={this.state.cardOpen}>
                        {output}
                    </Collapse>
                </CardBody>
            </Card>
        );
    }
}