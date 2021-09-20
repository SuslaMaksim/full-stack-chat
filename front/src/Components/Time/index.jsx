import React from 'react'
import {formatDistance} from "date-fns";
import './Time.scss'

let Time = (props)=>{
    let time = [2020,11,20,12,30,59];
    let time2 = [2020,11,20,10,30,59]
    let date = formatDistance(
        new Date(...time2),
        new Date(...time),
        { includeSeconds: true })

    return <>{date}</>
}

export default Time;