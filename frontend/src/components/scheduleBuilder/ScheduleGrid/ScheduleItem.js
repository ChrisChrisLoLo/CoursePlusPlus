import React from "react";

import "../styles/ScheduleGrid.css";

export default class ScheduleItem extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        console.log(this.state);
        // const style = "grid-column-start:"+this.props.col+";"+
        //                 "grid-column-end:"+(this.props.col+1)+";"+
        //                 "grid-row-start:"+this.props.rowStart+";"+
        //                 "grid-row-end:"+this.props.rowEnd;
        const style = {
            gridColumnStart:this.props.col,
            gridColumnEnd:this.props.col+1,
            gridRowStart:this.props.rowStart,
            gridRowEnd:this.props.rowEnd
        };

        return (
            <div className={"grid-item"} style={style}>
                <h5>CONTENT</h5>
            </div>
        );
    }
}