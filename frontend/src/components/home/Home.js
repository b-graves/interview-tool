import React, { Component } from 'react';
import { Navigator, Page, Button, Toolbar, BackButton } from 'react-onsenui';
import Dashboard from '../interviews/Dashboard';

export class Home extends Component {
    pushPage() {
        this.props.navigator.pushPage({ key: "Dashboard", component: Dashboard });
    }

    render() {
        return (
            <Page>
                {/* <Toolbar>
                    <div className="center">Home</div>
                </Toolbar> */}
                <Button onClick={this.pushPage.bind(this)}>Push page</Button>
            </Page>
        );
    }
}
