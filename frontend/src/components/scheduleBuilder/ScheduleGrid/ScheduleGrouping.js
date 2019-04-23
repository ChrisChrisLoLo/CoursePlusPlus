import React from "react";
// import {
//     Row,
//     Col
// } from 'reactstrap';

import ScheduleItem from "./ScheduleItem"

export default class ScheduleGrouping extends React.Component {
    render() {
        console.log(this.state);
        return (
            <div>
                <ScheduleItem row={"2"} col={"2"}/>
            </div>
        );
    }
}