import React from "react";
import {
    Row,
    Col
} from 'reactstrap';
import axios from "axios/index";
import ScheduleItem from "./ScheduleItem"
import "../styles/ScheduleGrid.css";

export default class ScheduleGrid extends React.Component {
    render() {
        return (
            <div>
                <div className={"grid-container"}>
                    <div className={"grid-test-1"}>
                        HELLO
                    </div>
                </div>
            </div>
        );
    }
}