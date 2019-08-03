import React from 'react'
import Day from './Day/Day'
import classes from './Days.module.scss'


const days = props => {
    return (
        <div className={classes.days}>
            <ul>
                {props.forecast.map(day => <Day key={day.Date} day={day}/>)}
            </ul>
        </div>
    )
}

export default days