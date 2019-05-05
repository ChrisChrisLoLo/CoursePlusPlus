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
        console.log("COURSECLASS")
        console.log(courseClass)
        //TODO: ONLY CONVERTS THE FIRST CLASS TIME. MAY BE AN ISSUE
        //The first row/col should have table headings, hence the offset
        //Also, grid cols/rows start at one :(
        const COL_OFFSET = 2;
        const ROW_OFFSET = 2;

        //end time ends at __:50 or __:20, but we want whole hours for our grid rows
        const END_TIME_OFFSET = 10/60;

        //Schedule starts at 08:00, so offset by this amount
        const HOUR_OFFSET = 8;

        const BLOCKS_PER_HOUR = 4;

        const DAY_COL_MAP = {
                        "U":+COL_OFFSET,
                        "M":1+COL_OFFSET,
                        "T":2+COL_OFFSET,
                        "W":3+COL_OFFSET,
                        "R":4+COL_OFFSET,
                        "F":5+COL_OFFSET,
                        "S":6+COL_OFFSET
                        }

        if (courseClass.classtime_set === null || courseClass.classtime_set.length === 0){
            console.warn("Adding class failed, no classtimes were found");
            return;
        }

        const classtime = courseClass.classtime_set[0];
        console.log(classtime)

        //Determine the length of the block(s)
        const hourStart = this.timeStringToHours(classtime.startTime);
        const hourEnd = this.timeStringToHours(classtime.endTime) + END_TIME_OFFSET;
        console.log(hourStart,hourEnd);
        const rowStart = Math.round((hourStart - HOUR_OFFSET)*BLOCKS_PER_HOUR) + ROW_OFFSET;
        const rowEnd = Math.round((hourEnd - HOUR_OFFSET)*BLOCKS_PER_HOUR) + ROW_OFFSET;

        //Pick a color based on the id of the course
        const color = this.intToCSSColor(courseClass.course);

        //Determine count of blocks. map each block to a day
        const dayLetters = classtime.day.trim().split("");
        return dayLetters.map((dayLetter)=>{
            const col = DAY_COL_MAP[dayLetter];
            return <ScheduleItem key={col} courseClass={courseClass} rowStart={rowStart} rowEnd={rowEnd} col={col} color={color}/>;
        });
    }


    //Hashes an integer into a semi-random color (All values generated should have high values and be bright)
    //Returns a string that can be interpreted as color in CSS
    intToCSSColor(input){
        const MAX_COLOR_VALUE = 255;
        const MIN_COLOR_VALUE = 107;
        const SCENARIO_COUNT = 6;

        const scenario = input % (SCENARIO_COUNT-1);

        //hash a color value between the max and min color value
        const randColorValue = (input % (MAX_COLOR_VALUE-MIN_COLOR_VALUE)) + MIN_COLOR_VALUE;

        const color = {red:0,green:0,blue:0};
        switch (scenario) {
            case 0:
                color.red = MAX_COLOR_VALUE; color.green = MIN_COLOR_VALUE; color.blue = randColorValue;
                break;
            case 1:
                color.red = MAX_COLOR_VALUE; color.green = randColorValue; color.blue = MIN_COLOR_VALUE;
                break;
            case 2:
                color.red = MIN_COLOR_VALUE; color.green = MAX_COLOR_VALUE; color.blue = randColorValue;
                break;
            case 3:
                color.red = MIN_COLOR_VALUE; color.green = randColorValue; color.blue = MAX_COLOR_VALUE;
                break;
            case 4:
                color.red = randColorValue; color.green = MAX_COLOR_VALUE; color.blue = MIN_COLOR_VALUE;
                break;
            case 5:
                color.red = randColorValue; color.green = MIN_COLOR_VALUE; color.blue = MAX_COLOR_VALUE;
        }

        return `rgb(${color.red},${color.green},${color.blue})`

    }


    render() {
        const scheduleItems = this.courseClassToScheduleItems(this.props.courseClass);


        return (
            <React.Fragment>
                {scheduleItems}
            </React.Fragment>
        );
    }
}