import React, { Component } from 'react';
import { Navigator, Page, Button, Toolbar, BackButton } from 'react-onsenui';
import Dashboard from '../plans/Dashboard';

export class Home extends Component {
    pushPage() {
        this.props.navigator.pushPage({ key: "Dashboard", component: Dashboard });
    }

    render() {
        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="center">
                        Interview Tool
                    </div>
                </Toolbar>}>
                <Button onClick={this.pushPage.bind(this)}>Push page</Button>
            </Page>
        );
    }
}
