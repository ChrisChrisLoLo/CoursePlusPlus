import React from "react";
import ScheduleGrouping from "./ScheduleGrouping";
import "../styles/ScheduleGrid.scss";
import ScheduleGridConsts from "./ScheduleGridConsts";
import timeStringToHours from "../../../userLib/timeStringToHours";


export default class ScheduleGrid extends React.Component {
  constructor(props) {
    super(props);
    this.checkTimeOverlap = this.checkTimeOverlap.bind(this);
  }

  //Check if a grouping overlaps with other groupings on the grid
  checkTimeOverlap(targetGroupingIndex, groupingArr) {

  }

  render() {
    const scheduleGroupings = this.props.classCart.map((classCart) => {
      return <ScheduleGrouping courseClass={classCart.courseClass} key={classCart.courseClass.id}/>
    });

    return (
      <div>
        <div className={"grid-container"}>
          <ScheduleGridConsts/>
          {scheduleGroupings}
        </div>
      </div>
    );
  }
}