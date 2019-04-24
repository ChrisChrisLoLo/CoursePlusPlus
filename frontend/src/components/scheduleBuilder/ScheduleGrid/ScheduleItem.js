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
        const style = "col-start:"+this.props.col+";"+
                        "col-end:"+this.props.col+1+";"+
                        "row-start:"+this.props.rowStart+";"+
                        "row-end:"+this.props.rowEnd;
        return (
            <div style={{style}}>
                <h5>CONTENT</h5>
            </div>
        );
    }
}