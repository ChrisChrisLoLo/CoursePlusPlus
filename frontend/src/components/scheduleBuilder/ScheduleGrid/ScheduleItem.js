import React from "react";

import "../styles/ScheduleGrid.scss";

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
            gridRowEnd:this.props.rowEnd,
            backgroundColor:this.props.color,
        };

        return (
            <div className={"grid-item"} style={style}>
                <p className={"my-0 small"}>{courseString}</p>
                <p className={"my-0 small"}>{courseClassString}</p>
                {/*<p className={"my-0 small"}>{classtime.id}</p>*/}
                <p className={"my-0 small"}>{classtime.location}</p>
            </div>
        );
    }
}