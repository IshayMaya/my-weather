import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar'
import WeatherDetails from '../../components/WeatherDetails/WeatherDetails'
import * as actions from '../../store/actions/forecast'


class Main extends Component {
    state = {
        cityName: '',
        defaultCity:'Tel Aviv'
    }

    async componentDidMount(){
        let {dailyForecasts} = this.props
        if (!dailyForecasts) await this.props.onForecastLoad(this.state.defaultCity) 
    }

    cityNameChangeHandler = ev => {
        let { value: cityName } = ev.target
        this.setState({ cityName })
    }

    findCityHandler = async (ev) => {
        ev.preventDefault()
        let { cityName } = this.state
        await this.props.onForecastLoad(cityName)
    }


    render() {
        return (
            <section>
                <SearchBar value={this.state.cityName} changed={this.cityNameChangeHandler} find={this.findCityHandler} />
                <WeatherDetails dailyForecasts={this.props.dailyForecasts} currentConditions={this.props.currentConditions}/>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        dailyForecasts: state.forecast.fiveDayForecast,
        currentConditions:state.forecast.currentConditions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onForecastLoad: (cityName) => dispatch(actions.getFiveDayForecast(cityName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);