import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import classes from './Login.module.scss';
import Icon from '@material-ui/core/Icon';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/auth'

class Login extends Component {
    state = {
        credentials: {
            email: 'a@b.com',
            password: 123456
        }
    }

    signInUser = ev => {
        ev.preventDefault()
        this.props.onAuth(this.state.credentials)
    }

    inputChangeHandler = ev => {
        const { name: propertyName, value } = ev.target
        const credentials = { ...this.state.credentials, [propertyName]: value }
        this.setState({ credentials })
    }

    render() {
        let { email, password } = this.state.credentials
        let redirect = this.props.isAuthenticated ? <Redirect to="/"/> : null
        return (
            <div className={classes.login}>
                {redirect}
                <form onSubmit={this.signInUser}>
                    <section className={classes['form-header']}>
                        <h1>Login</h1>
                        <div className={classes['input-container']}>
                            <input type="email" name="email" placeholder="someone@somewhere.com" value={email} onChange={this.inputChangeHandler} />
                            <Icon>perm_identity</Icon>
                        </div>
                        <div className={classes['input-container']}>
                            <input type="password" name="password" value={password} onChange={this.inputChangeHandler} minLength={6}/>
                            <Icon>lock</Icon>
                        </div>
                    </section>
                    <button type="submit">Log in</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: credentials => dispatch(actions.auth(credentials))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);