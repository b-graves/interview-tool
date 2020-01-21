import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Header from './layout/Header'
import App from './App';
import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register'
import PrivateRoute from './common/PrivateRoute'

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from "../actions/auth";



class Authentication extends Component {
    componentDidMount(){
        store.dispatch(loadUser());
    }

    render() {
        console.log("authenticate")
        return (
            <Provider store={store}>
                <Router>
                <Fragment>
                    <Switch>
                        <PrivateRoute exact path="/" component={App} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </Fragment>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<Authentication />, document.getElementById('app'));