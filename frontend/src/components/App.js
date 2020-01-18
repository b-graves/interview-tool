import React from 'react';
import { Navigator } from 'react-onsenui';

import { Home } from './home/Home';



export default class App extends React.Component {

    renderPage(route, navigator) {
        const props = route.props || {};
        props.navigator = navigator;
    
        return React.createElement(route.component, props);
    }

    render() {
        return (
            <Navigator
                initialRoute={{key: "Home", component: Home}}
                renderPage={this.renderPage}
            />
        );
    }
}