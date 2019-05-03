import React from "react";

import "../styles/ScheduleGrid.css";

export default class ScheduleItem extends React.Component {
    constructor(props){
        super(props);
    }

    render() {

        const courseClass = this.props.courseClass;
        const asString = courseClass.asString.split(" ");
        const courseString = asString[0]+" "+asString[1];
        const courseClassString = asString[2]+" "+asString[3];
        const classtime = courseClass.classtime_set[0];

        const style = {
            gridColumnStart:this.props.col,
            gridColumnEnd:this.props.col+1,
            gridRowStart:this.props.rowStart,
            gridRowEnd:this.props.rowEnd
        };

        return (
            <div className={"grid-item"} style={style}>
                <p>{courseString}</p>
                <p>{courseClassString}</p>
                <p>{classtime.id}</p>
                <p>{classtime.location}</p>
            </div>
        );
    }
}