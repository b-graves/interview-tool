import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComponent } from "../../actions/components"

import { Col, Row, List, ListItem, Button, Input, Icon } from 'react-onsenui';

export class AddComponent extends Component {
    state = {
        name: ''
    }

    static propTypes = {
        addComponent: PropTypes.func.isRequired,
        planId: PropTypes.number.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value});

    onSubmit = e => {
        e.preventDefault();
        const { name } = this.state;
        const component = { name, plan: this.props.planId, color: this.props.colorIdx };
        this.props.addComponent(component);
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
                        placeholder="+ Add New Component"
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

export default connect(null, { addComponent })(AddComponent);
