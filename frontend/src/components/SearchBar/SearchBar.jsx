import React from 'react'
import classes from './SearchBar.module.scss'

const searchBar = props => {
    let dropDownList = props.cityList && (
        <ul>
            {props.cityList.map(city => <li
                key={city.Key}
                onClick={() => props.cityClicked(city)}>{city.LocalizedName}
            </li>)}
        </ul>
    )
    return (
        <form onSubmit={props.find} className={classes['search-form']}>
            <input type="text" name="city" autoComplete="off" placeholder="Planning on a Trip ?"
                onChange={props.changed} value={props.value} />
            {dropDownList}
        </form>
    )
}

export default searchBar