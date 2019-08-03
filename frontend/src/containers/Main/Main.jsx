import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar'
import WeatherDetails from '../../components/WeatherDetails/WeatherDetails'
import * as actions from '../../store/actions/forecast'
import classes from './Main.module.scss'
import ErrorBoundary from '../../components/UI/ErrorBoundary/ErrorBoundary'


class Main extends Component {
    state = {
        cityName: '',
        defaultCity: 'Tel Aviv',
        cityList: null
    }

    async componentWillMount() {
        let { dailyForecasts } = this.props
        // let {cityName} = this.props.match.params
        // if (cityName) return await this.props.onForecastLoad(cityName)
        // if (!dailyForecasts) await this.props.onForecastLoad(this.state.defaultCity) 
        if (!dailyForecasts) await this.props.onGetCityNames(this.state.defaultCity)
    }


    cityNameChangeHandler = ev => {
        let { value: cityName } = ev.target
        cityName = cityName.replace(/[^A-Za-z\s]/ig, '')
        this.setState({ cityName })
    }

    findCityHandler = async (ev) => {
        ev.preventDefault()
        let { cityName } = this.state
        let cityList = await this.props.onGetCityNames(cityName)
        console.log(cityList);
        this.setState({ cityList,cityName:'' })

        // await this.props.onForecastLoad(cityName)
    }

    getForecastHandler = async (city) => {
        this.setState({cityList:null})
        await this.props.onForecastLoad(city)
    }

    closeDropDownHandler = () => {
        this.setState({cityList: null})
    }


    render() {
        return (
            <section className={classes.main} onClick={this.closeDropDownHandler}>
                <SearchBar
                    value={this.state.cityName}
                    changed={this.cityNameChangeHandler}
                    find={this.findCityHandler}
                    cityList={this.state.cityList}
                    cityClicked={this.getForecastHandler}
                />
                <ErrorBoundary>
                    <WeatherDetails
                        dailyForecasts={this.props.dailyForecasts}
                        currentConditions={this.props.currentConditions}
                        currentLocation={this.props.currentLocation}
                    />
                </ErrorBoundary>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        dailyForecasts: state.forecast.fiveDayForecast,
        currentConditions: state.forecast.currentConditions,
        currentLocation: state.forecast.currentLocation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onForecastLoad: (cityName) => dispatch(actions.getFiveDayForecast(cityName)),
        onGetCityNames: (cityName) => dispatch(actions.getCityNames(cityName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);