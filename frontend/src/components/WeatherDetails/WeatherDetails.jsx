import React from 'react';
import classes from './WeatherDetails.module.scss'
import Headline from './Headline/Headline'
import Spinner from '../UI/Spinner/Spinner'
import Days from './Days/Days'


const weatherDetails = props => {
    let detailsBody = <Spinner />
    if (props.dailyForecasts && !props.isLoading) detailsBody = (
        <div className={classes.details}>
            <Headline forecast={props.currentConditions}
                location={props.currentLocation}
                addToFavorites={props.onAddToFavorites} />
            <section className={classes['details-bottom']}>
                <section className={classes['details-conditions']}>
                    <h2>{props.currentConditions.Temperature.Metric.Value}&#730;</h2>
                    <h1>{props.currentConditions.WeatherText}</h1>
                </section>
                <Days forecast={props.dailyForecasts} />
            </section>
        </div>
    )
    return <>{detailsBody}</>
}


export default weatherDetails;