import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    CardText,
    Collapse, Row, Col,

} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./styles/ResultItem.css";

import axios from "axios";

import ResultItemClass from "./ResultItemClass";
import InputGroup from "reactstrap/es/InputGroup";


export default class ResultItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cardOpen: false, descOpen: false, courseClassData: null };
        this.toggleOpen = this.toggleOpen.bind(this);
        this.toggleDesc = this.toggleDesc.bind(this);
        this.changePaginationURL = this.changePaginationURL.bind(this);
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

    changePaginationURL(resourceURL){
        axios.get(resourceURL)
            .then(res => {
                const courseClassResData = res.data;
                this.setState({ courseClassData: courseClassResData });
            });
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
                    <CardTitle className={"mb-0"}>
                        <InputGroup className={"align-middle"}>
                            <h5 className={"mr-2"}> {course.title}</h5>
                            {/*<Button onClick={this.toggleDesc} size="sm">Desc</Button>*/}
                            <FontAwesomeIcon
                                icon={this.state.descOpen ? "chevron-up" : "chevron-down"}
                                size={"1x"}
                                onClick={this.toggleDesc}
                                className={"chevron"}
                            />
                        </InputGroup>
                    </CardTitle>

                    <Collapse isOpen={this.state.descOpen}>
                        <CardText className={"small"}>{course.description || "No description available."}</CardText>
                    </Collapse>


                    <Button onClick={this.toggleOpen} size="sm" className={"mt-2"}>Classes</Button>
                    <Collapse isOpen={this.state.cardOpen}>
                        {output}
                        {data &&
                            <Row className="justify-content-between">
                                <Col sm={{ size: "auto" }}>
                                    {data.previous &&
                                        <Button color="primary" onClick={() => { this.changePaginationURL(data.previous) }}>Prev</Button>
                                    }
                                </Col>
                                <Col sm={{ size: "auto" }}>
                                    {data.next &&
                                        <Button color="primary" onClick={() => { this.changePaginationURL(data.next) }}>Next</Button>
                                    }
                                </Col>
                            </Row>
					    }
                    </Collapse>
                </CardBody>
            </Card>
        );
    }
}