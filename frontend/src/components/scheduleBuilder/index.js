import React from "react";
import {
    Row,
    Col
} from 'reactstrap';
import axios from "axios";

export default class ScheduleBuilderPage extends React.Component {
    render() {
        console.log(this.state);
        return (
            <div>
                <Row>
                    <Col>
                        <h3>Schedule Builder</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>BUILDER</h1>
                    </Col>
                </Row>
            </div>
        );
    }
}