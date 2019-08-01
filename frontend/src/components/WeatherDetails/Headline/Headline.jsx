import React from 'react'
import classes from './Headline.module.scss'

const headline = props => {
    return (
        <div>
            <h1>{props.forecast.WeatherText}</h1>
            <h2>{props.forecast.Temperature.Metric.Value}</h2>
            <img src={`https://developer.accuweather.com/sites/default/files/${props.forecast.WeatherIcon}-s.png`} alt="" />
        </div>
    )
}

export default headline