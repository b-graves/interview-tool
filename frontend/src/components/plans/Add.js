import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPlan } from "../../actions/plans"

import { Col, Row, List, ListItem, Button, Input, Icon } from 'react-onsenui';

import Help from '../Help';

export class Add extends Component {
    state = {
        name: ''
    }

    static propTypes = {
        addPlan: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value});

    onSubmit = e => {
        e.preventDefault();
        const { name } = this.state;
        const plan = { name };
        this.props.addPlan(plan);
        this.setState({
            name: ""
        });
    }

    render() {
        return (
            <ListItem style={{backgroundColor: "#f0eff4"}}>
                <form onSubmit={this.onSubmit} style={{width: "100%"}}>
                    <Help extra={true} text="A plan defines the structure of a particular type of session you want to deliver."/>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Add New Plan"
                        onChange={this.onChange}
                        value={this.state.name}
                        style={{width: "70%"}}
                    />
                    {this.state.name !== '' ? <button type="submit" className="button button--quiet" style={{width: "20%"}}>Create</button> : null}
                </form>
            </ListItem>
        )
    }
}

export default connect(null, { addPlan })(Add);
