//convert a time string to 24 hour time
export default (timeString) => {
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
    // console.log(timeArr);
    // console.log("HOUR:"+hour);
    // console.log("MINUTE:"+minute);
    console.log(parseFloat(hour) + parseFloat(minute)/60 + periodOffSet);
    return parseFloat(hour) + parseFloat(minute)/60 + periodOffSet;
}