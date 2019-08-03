import React, { Component } from 'react'
import './Header.scss'
import { NavLink } from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import BackDrop from '../UI/BackDrop/BackDrop'


class Header extends Component {
    state = {
        isNavOpen: false
    }

    toggleNavHandler = () => {
        this.setState(prevState => {
            let { isNavOpen } = prevState
            return { isNavOpen: !isNavOpen }
        })
    }
    render() {
  
        return (
            <nav className='header' >
                <h2 className='logo'>My Weather</h2>
                <section className={`links ${this.state.isNavOpen ? 'show' : 'hide'}`}>
                    <NavLink to="/" exact onClick={this.toggleNavHandler}>Main</NavLink>
                    <NavLink to="/favorites" exact onClick={this.toggleNavHandler}>Favorites</NavLink>
                </section>
                <BackDrop show={this.state.isNavOpen} clicked={this.toggleNavHandler}/>
                <button className='burger-btn' onClick={this.toggleNavHandler}><Icon>dashboard</Icon></button>
            </nav>
        );
    }
}

export default Header;