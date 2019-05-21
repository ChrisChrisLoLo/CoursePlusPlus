import React from "react";

import "../styles/ScheduleGrid.scss";

export default class ScheduleItem extends React.Component {
  render() {

    const courseClass = this.props.courseClass;
    const asString = courseClass.asString.split(" ");
    let courseString;
    let courseClassString;

    //Some subjects can have spaces in them (AN SC); This handles the case where that occurs
    if (asString.length === 5) {
      courseString = asString[0] + " " + asString[1] + " " + asString[2];
      courseClassString = asString[3] + " " + asString[4];
    } else {
      courseString = asString[0] + " " + asString[1];
      courseClassString = asString[2] + " " + asString[3];
    }

    const classtime = courseClass.classtime_set[0];

    const style = {
      gridColumnStart: this.props.col,
      gridColumnEnd: this.props.col + 1,
      gridRowStart: this.props.rowStart,
      gridRowEnd: this.props.rowEnd,
      backgroundColor: this.props.color,
    };

    const previewStyle = this.props.preview === true ? "preview" : "";

    return (
      <div className={"grid-item " + previewStyle} style={style}>
        <p className={"my-0 small"}>{courseString}</p>
        <p className={"my-0 small"}>{courseClassString}</p>
        {/*<p className={"my-0 small"}>{classtime.id}</p>*/}
        <p className={"my-0 small"}>{classtime.location}</p>
      </div>
    );
  }
}