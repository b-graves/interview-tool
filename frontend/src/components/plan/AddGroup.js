import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addGroup } from "../../actions/groups"

import { Col, Row, List, ListItem, Button, Input, Icon } from 'react-onsenui';

export class AddGroup extends Component {
    state = {
        name: ''
    }

    static propTypes = {
        addGroup: PropTypes.func.isRequired,
        planId: PropTypes.number.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value});

    onSubmit = e => {
        e.preventDefault();
        const { name } = this.state;
        const group = { name, plan: this.props.planId, color: this.props.color };
        this.props.addGroup(group);
        this.setState({
            name: ""
        });
    }

    backgroundColors = ["#fff", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]

    render() {
        return (
            <h3>
                <form onSubmit={this.onSubmit} style={{width: "100%"}}>
                    <Input
                        type="text"
                        name="name"
                        placeholder={this.props.first ? "+ Add First Session Stage (E.g. Introductory Questions)" :"+ Add New Stage"}
                        onChange={this.onChange}
                        value={this.state.name}
                        style={{width: "80%", color: this.backgroundColors[this.props.colors], fontSize: "24px"}}
                    />
                    {this.state.name !== '' ? <button type="submit" className="button button--quiet" style={{width: "20%"}}>Create</button> : null}
                </form>
            </h3>
        )
    }
}

export default connect(null, { addGroup })(AddGroup);
