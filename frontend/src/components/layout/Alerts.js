import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { Toast } from 'react-onsenui';

export class Alerts extends Component {
    state = {
        open: false,
        messages: [],
        error: false,
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, message } = this.props;
        if (error !== prevProps.error) {
            let messages = []
            if (error.msg.name) {
                messages.push(`Name: ${error.msg.name.join()}`)
            }
            if (error.msg.username) {
                messages.push(`Userame: ${error.msg.username.join()}`)
            }
            if (error.msg.password) {
                messages.push(`Password: ${error.msg.password.join()}`)
            }
            if (error.msg.non_field_errors) {
                messages.push(error.msg.non_field_errors.join())
            }

            if (messages.length > 0) {
                this.setState({open: true, messages : messages, error: true})
                setTimeout(function(){this.setState({open: false, messages: []})}.bind(this), 10000);
            }
        }
        if (message !== prevProps.message) {
            if (message.genericMessage) {
                this.setState({open: true, messages: [message.genericMessage], error: false});
                setTimeout(function(){this.setState({open: false, messages: []})}.bind(this), 3000);
            }
        }
    }

    render() {
        let messages = this.state.messages.map(message => <div style={this.state.error ? {"color": "#ff7b7b"}: null}>{message}</div>)
        return (
            this.state.messages.length > 0 ? 
                <Toast isOpen={this.state.open}>
                    {messages}
                </Toast> 
            : null
        )
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(Alerts)
