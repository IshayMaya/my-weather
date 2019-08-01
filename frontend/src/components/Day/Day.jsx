import React from 'react'
import moment from 'moment'
import classes from './Day.module.scss'


const day = props => {
    let maxTemperature = props.day.Temperature.Maximum.Value
    let minTemperature = props.day.Temperature.Minimum.Value
    let avgTemperature = ((+maxTemperature + +minTemperature ) / 2).toFixed(1)
    let nightIcon = props.day.Night.Icon < 10 ? '0' + props.day.Night.Icon : props.day.Night.Icon
    let dayIcon = props.day.Day.Icon < 10 ? '0' + props.day.Day.Icon : props.day.Day.Icon
    return (
        <div>
            <h2>{moment(props.day.Date).format('ddd')}</h2>
            {/* <h3>{avgTemperature } &#8451;</h3> */}
            <section className={classes.night}>
                <p>{props.day.Night.IconPhrase}</p>
                <img src={`https://developer.accuweather.com/sites/default/files/${nightIcon}-s.png`} alt={props.day.Night.IconPhrase} srcset=""/>
                <p>{props.day.Temperature.Minimum.Value}</p>
            </section>
            <section className={classes.day}>
                <p>{props.day.Day.IconPhrase}</p>
                <img src={`https://developer.accuweather.com/sites/default/files/${dayIcon}-s.png`} alt={props.day.Night.IconPhrase} srcset=""/>
                <p>{props.day.Temperature.Minimum.Value}</p>
            </section>
        </div>
    )
}

export default day