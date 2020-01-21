import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import { Card } from 'react-onsenui';

import { Page, Input, Toolbar } from 'react-onsenui';

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

    onChange = e => this.setState({ [e.target.id]: e.target.value });

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="left" style={{ marginLeft: "15px" }}>
                        Interview Tool
                  </div>
                </Toolbar>}>
                <div style={{ textAlign: "center", marginTop: "20%" }}>
                    <h2>Login</h2>
                    <form onSubmit={this.onSubmit}>
                        <p>
                            <Input
                                type="text"
                                placeholder="Username"
                                inputId="username"
                                modifier='underbar'
                                onChange={this.onChange}
                                value={this.state.username}
                            />
                        </p>
                        <p>
                            <Input
                                type="password"
                                placeholder="Password"
                                inputId="password"
                                modifier='underbar'
                                onChange={this.onChange}
                                value={this.state.password}
                            />
                        </p>
                        <p>
                            <button type="submit" className="button">Submit</button>
                        </p>
                        <p>
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </form>
                </div>
            </Page>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
