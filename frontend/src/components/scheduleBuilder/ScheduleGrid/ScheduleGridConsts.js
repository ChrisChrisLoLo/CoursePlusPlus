import React from "react";
import "../styles/ScheduleGrid.scss";

export default class ScheduleGridConsts extends React.Component{
    render(){
        const ROW_OFFSET = 1;
        const COL_OFFSET = 1;
        const ROWS_PER_HOUR = 4;

        const WEEK_COL = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        //Times of the schedule in 24h time
        const START_HOUR = 8;
        const END_HOUR = 20;
        const HOUR_ROW = [];

        for(let i=START_HOUR; i<=END_HOUR; i++){
            HOUR_ROW.push(i+":00");
        }

        const weekColHeaders = WEEK_COL.map((day,i)=>{
            return <div key={i} className={"grid-col-head-"+(i+COL_OFFSET)}>{day}</div>
        });

        const hourRowHeaders = HOUR_ROW.map((hour,i)=>{
            return <div key={i} className={"grid-row-head-"+((i*ROWS_PER_HOUR)+ROW_OFFSET)}>{hour}</div>
        });


        return(
            <React.Fragment>
                {weekColHeaders}
                {hourRowHeaders}
            </React.Fragment>
        );
    }
}