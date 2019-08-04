import React,{Component} from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Location from './Location/Location'
import Spinner from '../UI/Spinner/Spinner'
import classes from './Locations.module.scss'
import * as actions from '../../store/actions/forecast'

class Locations extends Component {
    state = { 
        loadingCurrentWeather:null

    }

    locationClickHandler = async (location) => {
        this.setState({loadingCurrentWeather:location.city})
        await this.props.onGetCurrentWeather(location)
        this.props.history.push(`/${location.city}`)
    }


    render() { 
        const locationItems = !this.props.locations ? <Spinner /> : 
        this.props.locations.map(loc => (
            <Location location={loc} 
            key={loc.Key} 
            locationClicked={() => this.locationClickHandler(loc)}
            showSpinner={this.state.loadingCurrentWeather === loc.city}/>
        ))
        return <ul className={classes.locations}>{locationItems}</ul>
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onGetCurrentWeather: (cityName) => dispatch(actions.getFiveDayForecast(cityName))
    };
};
 
export default connect(null, mapDispatchToProps)(withRouter(Locations))