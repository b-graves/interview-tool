import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

import { Page, Input, Toolbar } from 'react-onsenui';

export class Register extends Component {
    state = {
        username: '',
        password: '',
        password2: ''
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        const { username, password, password2 } = this.state;
        if (password !== password2) {
            this.props.createMessage({ passwordsNotMatch: "Passwords do not match" })
        } else {
            const user = { username, password };
            this.props.register(user);
        }
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
                    <h2>Register</h2>
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
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            inputId="password2"
                            modifier='underbar'
                            onChange={this.onChange}
                            value={this.state.password2}
                        />
                        </p>
                        <p>
                            <button type="submit" className="button button-light-blue">Submit</button>
                        </p>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
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

export default connect(mapStateToProps, { register, createMessage })(Register)
