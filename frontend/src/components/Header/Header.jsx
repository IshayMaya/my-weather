import React from 'react'
import classes from './Header.module.scss'
import {NavLink} from 'react-router-dom'

const header = props => {

    return (
        <nav className={classes.header}>
            <h2 className={classes.logo}>My Weather</h2>
            <section className={classes.links}>
                <NavLink to="/" exact>Main</NavLink>
                <NavLink to="/favorites" exact>Favorites</NavLink>
            </section>
        </nav>

    )
}

export default header