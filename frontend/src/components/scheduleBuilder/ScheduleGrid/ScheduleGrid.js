import React from "react";
import ScheduleGrouping from "./ScheduleGrouping";
import "../styles/ScheduleGrid.scss";
import ScheduleGridConsts from "./ScheduleGridConsts";

export default class ScheduleGrid extends React.Component {
    constructor(props){
        super(props);
        this.checkTimeOverlap = this.checkTimeOverlap.bind(this);
        this.convertTimes = this.convertTimes.bind(this);
    }

    convertTimes(){
        const courses = this.props.courseClasses;

    }

    checkTimeOverlap(){

    }

    render() {
        const scheduleGroupings = this.props.courseClasses.map((courseClass)=>{
            return <ScheduleGrouping courseClass={courseClass} key={courseClass.id}/>
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