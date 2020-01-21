import React, { Component } from 'react';

export default class Content extends Component {
    render() {
        return (
            <div style={{padding: "3%"}}>
                {this.props.children}
            </div>
        );
    }
}
