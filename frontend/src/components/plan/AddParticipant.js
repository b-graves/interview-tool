import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addParticipant } from "../../actions/participants"

import { Col, Row, List, ListItem, Button, Input, Icon } from 'react-onsenui';

export class AddParticipant extends Component {
    state = {
        name: ''
    }

    static propTypes = {
        addParticipant: PropTypes.func.isRequired,
        planId: PropTypes.number.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value});

    onSubmit = e => {
        e.preventDefault();
        const { name } = this.state;
        const participant = { name, plan: this.props.planId };
        this.props.addParticipant(participant);
        this.setState({
            name: ""
        });
    }

    render() {
        return (
            <ListItem style={{backgroundColor: "#f0eff4"}}>
                <form onSubmit={this.onSubmit} style={{width: "100%"}}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="+ Add New Participant"
                        onChange={this.onChange}
                        value={this.state.name}
                        style={{width: "80%"}}
                    />
                    {this.state.name !== '' ? <button type="submit" className="button button--quiet" style={{width: "20%"}}>Create</button> : null}
                </form>
            </ListItem>
        )
    }
}

export default connect(null, { addParticipant })(AddParticipant);
