import React, { Component } from 'react';
import { connect } from 'react-redux';
import Locations from './Locations/Locations'
import ErrorBoundary from '../../components/UI/ErrorBoundary/ErrorBoundary'
import * as actions from '../../store/actions/favorites'
import classes from './Favorites.module.scss'

class Favorites extends Component {
    state = {}
    async componentDidMount() {
        await this.props.onLoadFavorites()
        console.log(this.props.history);
        
    }
    render() {
        return (
            <section className={classes.favorites}>
            <ErrorBoundary>
                <Locations locations={this.props.favoriteList}/>
            </ErrorBoundary>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        favoriteList: state.forecast.favoriteList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadFavorites: () => dispatch(actions.loadFavorites())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);