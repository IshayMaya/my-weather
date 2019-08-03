import React from 'react';
import { connect } from 'react-redux';
import classes from './WeatherDetails.module.scss'
import Headline from './Headline/Headline'
import Spinner from '../UI/Spinner/Spinner'
import Days from './Days/Days'
import * as actions from '../../store/actions/favorites'



const weatherDetails = props =>  {
    let detailsBody = <Spinner />
    if (props.dailyForecasts) detailsBody = (
        <div className={classes.details}>
            <Headline forecast={props.currentConditions} location={props.currentLocation} addToFavorites={props.onAddToFavorites}/>
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

const mapStateToProps = state => {
    return {
        favoriteList: state.forecast.favoriteList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddToFavorites: () => dispatch(actions.addToFavorites())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(weatherDetails);