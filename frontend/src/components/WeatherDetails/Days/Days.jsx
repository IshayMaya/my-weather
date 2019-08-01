import React from 'react'
import Day from '../../Day/Day'


const days = props => {
    return (
        <div>
            <ul>
                {props.forecast.map(day => <Day key={day.Date} day={day}/>)}
            </ul>
        </div>
    )
}

export default days