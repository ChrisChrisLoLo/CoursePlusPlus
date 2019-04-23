import React from "react";
import {
    Row,
    Col
} from 'reactstrap';
import axios from "axios/index";
import ClassCart from "./ClassCart/ClassCart"
import ScheduleGrid from "./ScheduleGrid/ScheduleGrid"

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
                    <Col sm={"3"}>
                        <ClassCart/>
                    </Col>
                    <Col sm={"9"}>
                        <ScheduleGrid/>
                    </Col>
                </Row>
            </div>
        );
    }
}