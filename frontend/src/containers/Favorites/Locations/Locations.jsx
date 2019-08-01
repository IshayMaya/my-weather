import React from 'react'
import Location from './Location/Location'
import Spinner from '../../../components/UI/Spinner/Spinner'

const locations = props => {
    const locationItems = !props.locations ? <Spinner /> : props.locations.map(loc => <Location location={loc} key={loc.id}/>)
    return <ul>{locationItems}</ul>
}

export default locations