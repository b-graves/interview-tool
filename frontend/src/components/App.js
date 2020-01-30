import React from 'react';
import { Navigator } from 'react-onsenui';

import Dashboard from './plans/Dashboard';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Alerts from './layout/Alerts';

export default class App extends React.Component {

    renderPage(route, navigator) {
        const props = route.props || {};
        props.navigator = navigator;
    
        return React.createElement(route.component, props);
    }

    render() {
        return (
            <Navigator
                initialRoute={{key: "Dashboard", component: Dashboard}}
                renderPage={this.renderPage}
            />
        );
    }
}