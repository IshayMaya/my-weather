import React from 'react'
import classes from './SearchBar.module.css'

const searchBar = props => {
    return (
        <form onSubmit={props.find}>
            <input type="text" name="city" onChange={props.changed} value={props.value}/>
        </form>
    )
}

export default searchBar