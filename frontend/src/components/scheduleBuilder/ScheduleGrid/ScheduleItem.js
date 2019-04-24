import React from "react";
// import {
//     Row,
//     Col
// } from 'reactstrap';

import ScheduleItem from "./ScheduleItem"
import "../styles/ScheduleGrid.css";

export default class ScheduleGrouping extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        console.log(this.state);
        const style = "col-start" + this.props.row + ";" + this.props.col + ";";
        return (
            <div style={style}>
                <h5>CONTENT</h5>
            </div>
        );
    }
}