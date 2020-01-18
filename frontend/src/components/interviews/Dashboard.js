import React, { Component } from 'react';
import Form from "./Form";
import Interviews from "./Interviews"
import { Navigator, Page, Button, Toolbar, BackButton } from 'react-onsenui';

export default class Dashboard extends Component {

    pushPage() {
        this.props.navigator.pushPage({ component: Dashboard });
    }

    popPage() {
        this.props.navigator.popPage();
    }

    render() {
        return (
            <Page>
                <p style={{ textAlign: 'center' }}>
                    <Button onClick={this.pushPage.bind(this)}>Push page</Button>
                    <Button onClick={this.popPage.bind(this)}>Pop page</Button>
                </p>
            </Page>
        );
    }
}
