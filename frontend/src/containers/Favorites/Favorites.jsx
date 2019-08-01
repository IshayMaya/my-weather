import React, { Component } from 'react';
import { connect } from 'react-redux';
import Locations from './Locations/Locations'
import * as actions from '../../store/actions/favorites'

class Favorites extends Component {
    state = {}
    async componentDidMount() {
        await this.props.onLoadFavorites()
        console.log('this.props.favoriteList : ',this.props.favoriteList);
        

    }
    render() {
        return (
            <Locations locations={this.props.favoriteList}/>
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