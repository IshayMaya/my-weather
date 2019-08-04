import React from 'react'
import classes from './Location.module.scss'
import Spinner from '../../UI/Spinner/Spinner'

const location = props => {
    const weatherIcon = (props.location.conditions.WeatherIcon) < 10 ? '0' + props.location.conditions.WeatherIcon : props.location.conditions.WeatherIcon
    const locationDisplay = props.showSpinner ? <Spinner /> : 
    (
        <>
            <section className={classes['location-top']}>
                <h2>{props.location.city}</h2>
                <img src={`https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`} alt=""/>
            </section>
            <section className={classes['location-bottom']}>
                <h2>{props.location.conditions.Temperature.Metric.Value}&#730;</h2>
                <h1>{props.location.conditions.WeatherText}</h1>
            </section>
        </>
       
    )
    return (
        <div 
        className={classes.location} 
        onClick={props.locationClicked}>
            {locationDisplay}
        </div>
        
    )
}



export default location