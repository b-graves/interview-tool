import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import { Page, Toolbar, Button } from 'react-onsenui';

export class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password)
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value});

    render() {
        if (this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        return (
            <Page>
                <Button onClick={this.handleClick}>Tap me!</Button>
            </Page>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
