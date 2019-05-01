import React from "react";

import ScheduleItem from "./ScheduleItem"

export default class ScheduleGrouping extends React.Component {
    constructor(props){
        super(props);
        this.courseClassToScheduleItems = this.courseClassToScheduleItems.bind(this);
    }

    timeStringToHours(timeString){
        const timeArr = timeString.trim().split(" ");

        const hour = timeArr[0].split(":")[0];
        const minute = timeArr[0].split(":")[1];
        let periodOffSet = 0.0;
        if (parseInt(hour) === 12){
            periodOffSet = timeArr[1] === "PM" ? 0.0:12.0;
        }
        else{
            periodOffSet = timeArr[1] === "AM" ? 0.0:12.0;
        }
        console.log(timeArr)
        console.log("HOUR:"+hour)
        console.log("MINUTE:"+minute)
        console.log(parseFloat(hour) + parseFloat(minute)/60 + periodOffSet);
        return parseFloat(hour) + parseFloat(minute)/60 + periodOffSet;
    }

    courseClassToScheduleItems(courseClass){
        //TODO: ONLY CONVERTS THE FIRST CLASS TIME. MAY BE AN ISSUE
        //The first row/col should have table headings, hence the offset
        const COL_OFFSET = 1;
        const ROW_OFFSET = 1;

        //end time ends at __:50 or __:20, but we want whole hours for our grid rows
        const END_TIME_OFFSET = 10/60;

        //Schedule starts at 08:00, so offset by this amount
        const HOUR_OFFSET = 8;


        const DAY_COL_MAP = {"M":COL_OFFSET,
                        "T":1+COL_OFFSET,
                        "W":2+COL_OFFSET,
                        "R":3+COL_OFFSET,
                        "F":4+COL_OFFSET,
                        "S":5+COL_OFFSET,
                        "U":6+COL_OFFSET
                        };

        if (courseClass.classtimes.length === 0) return;

        const classtime = courseClass.classtimes[0];

        //Determine the length of the block(s)
        const hourStart = Math.round(this.timeStringToHours(classtime.startTime));
        const hourEnd = Math.round(this.timeStringToHours(classtime.endTime) + END_TIME_OFFSET);

        const rowStart = (hourStart - HOUR_OFFSET) + ROW_OFFSET;
        const rowEnd = (hourEnd - HOUR_OFFSET) + ROW_OFFSET;


        //Determine count of blocks
        const dayLetters = classtime.day.trim().split("");
        return dayLetters.map((dayLetter)=>{
            const col = DAY_COL_MAP[dayLetter];
            return <ScheduleItem key={col} courseClass={courseClass} rowStart={rowStart} rowEnd={rowEnd} col={col}/>;
        });
    }


    render() {
        const scheduleItems = this.courseClassToScheduleItems(this.props.courseClass);


        return (
            <div>
                {scheduleItems}
            </div>
        );
    }
}