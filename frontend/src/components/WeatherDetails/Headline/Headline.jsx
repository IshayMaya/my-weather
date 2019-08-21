import React from 'react'
import classes from './Headline.module.scss'
import moments from 'moment'
import Icon from '@material-ui/core/Icon'

const headline = props => {
    const localTime = props.forecast.LocalObservationDateTime
    return (
        <div className={classes.headline}>
            <section className={classes['headline-left']}>
                <section className={classes['headline-date']}>
                    <h1>{moments(localTime).format('MMMM') + ' ' + moments(localTime).format('D')}</h1>
                    <button className={classes['add-btn']} onClick={props.addToFavorites}>
                        <Icon className={classes['add-btn']}>
                            {props.location.isOnFavorites ? 'favorite' : 'favorite_border'}
                        </Icon>
                    </button>
                </section>
                <section className={classes['headline-location']}>
                    <h2>{props.location.city}</h2>
                    <h1>{props.location.country}</h1>
                </section>
            </section>
        </div>
    )
}

export default headline