import React from "react";
import {
    Row,
    Col
} from 'reactstrap';
import axios from "axios";
import ScheduleGrid from "./ScheduleGrid"

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
                        <ScheduleGrid/>
                    </Col>
                </Row>
            </div>
        );
    }
}