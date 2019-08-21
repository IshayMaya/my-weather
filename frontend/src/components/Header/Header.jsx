import React, { useState } from 'react'
import './Header.scss'
import { NavLink } from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import BackDrop from '../UI/BackDrop/BackDrop'


const Header = props => {
    const [isNavOpen, setNavStatus] = useState(false)
    const toggleNavHandler = () => {
        setNavStatus(() => !isNavOpen)
    }
    return (
        <nav className='header' >
            <h2 className='logo'>My Weather</h2>
            <section className={`links ${isNavOpen ? 'show' : 'hide'}`}>
                <NavLink to="/" exact onClick={toggleNavHandler}>Main</NavLink>
                <NavLink to="/favorites" exact onClick={toggleNavHandler}>Favorites</NavLink>
                {props.isAuth ? <NavLink to="/logout" exact onClick={toggleNavHandler}>Logout</NavLink>
                    : <NavLink to="/login" exact onClick={toggleNavHandler}>Login</NavLink>}
            </section>
            <BackDrop show={isNavOpen} clicked={toggleNavHandler} />
            <button className='burger-btn' onClick={toggleNavHandler}><Icon>dashboard</Icon></button>
        </nav>
    );
}

export default Header;