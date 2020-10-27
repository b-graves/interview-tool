import React, { Component } from 'react';
import Plans from "./Plans"
import { Navigator, Page, Button, Toolbar, BackButton } from 'react-onsenui';
import Content from '../layout/Content';

import { ReactMic } from 'react-mic';

export default class Dashboard extends Component {

    pushPage() {
        this.props.navigator.pushPage({ component: Dashboard });
    }

    popPage() {
        this.props.navigator.popPage();
    }

    render() {
        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="left">
                    </div>
                    <div className="center">
                        Interview Tool
                    </div>
                </Toolbar>}>
                <Content>
                    <Plans navigator={this.props.navigator} />
                </Content>
            </Page >
        );
    }
}