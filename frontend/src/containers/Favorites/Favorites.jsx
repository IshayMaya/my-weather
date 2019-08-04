import React, { Component } from 'react';
import { connect } from 'react-redux';
import Locations from '../../components/Locations/Locations'
import * as actions from '../../store/actions/favorites'
import classes from './Favorites.module.scss'

class Favorites extends Component {
    state = {}

    async componentDidMount() {
        await this.props.onLoadFavorites()
    }

    componentWillUnmount(){
        this.props.onClearFavorites()
    }
    render() {
        return (
            <section className={classes.favorites}>
                <Locations locations={this.props.favoriteList}/>
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
        onLoadFavorites: () => dispatch(actions.loadFavorites()),
        onClearFavorites: () => dispatch(actions.clearFavorites()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);