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
        <div>
            <button className={classes['add-btn']} onClick={props.onAddToFavorites}><i class="fas fa-heart"></i></button>
            <Headline forecast={props.currentConditions} />
            <Days forecast={props.dailyForecasts} />
        </div>
    )
    return <>{detailsBody}</>
}


const mapDispatchToProps = dispatch => {
    return {
        onAddToFavorites: () => dispatch(actions.addToFavorites())
    };
};

export default connect(null, mapDispatchToProps)(weatherDetails);