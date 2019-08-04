import React from 'react'
import classes from './ErrorModal.module.css'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/forecast'


const errorModal = props => {
    setTimeout(() => {
        return props.onCloseErrorModal()
    }, 5000)
    return (
        <div className={classes['error-modal']}>
            Something Went Wrong.
        </div>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        onCloseErrorModal: () => dispatch(actions.closeErrorModal()),
    };
};

export default connect(null, mapDispatchToProps)(errorModal)