import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent } from '../../actions/components'


import { Col, Row, List, ListItem, Button, Icon } from 'react-onsenui';

import { FaCheck } from 'react-icons/fa';
import { FiChevronUp, FiChevronDown, FiChevronsDown, FiChevronsUp, FiMinus} from 'react-icons/fi';

export class TickboxesView extends Component {

    backgroundColors = ["#fff", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]
    colors = ["#000", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]

    fgOnlyColors =  ["#000", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]

    state = {
        hideList: false,
        removeList: false,
    }

    priorityIcons = {
        "-2" : <FiChevronsDown className="list-priority-icon" />,
        "-1" : <FiChevronDown className="list-priority-icon" />,
        1 : <FiChevronUp className="list-priority-icon" />,
        2 : <FiChevronsUp className="list-priority-icon" />,
    }
    

    render() {
        let groupColors = {}

        for (let i = 0; i < this.props.groups.length; i++) {
            groupColors[this.props.groups[i].id] = this.props.groups[i].color
        }

        return (
            !this.props.useGroups ? <Fragment>
                <List
                    dataSource={this.props.components}
                    renderRow={(component, idx) => (
                        <Row>
                            <Col>
                                <ListItem
                                    modifier='material'
                                    className={this.props.componentCompletion[component.id] ? 'card--completed list-item__checkboxes ' : 'list-item__checkboxes'}
                                    style={{ backgroundColor: this.backgroundColors[groupColors[component.group]], color: this.colors[groupColors[component.group]] }}
                                >
                                    <div className="checkbox-text">{
                                        component.name}
                                        {component.priority !== 0 ? this.priorityIcons[component.priority] : null}
                                    </div>
                                    {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                </ListItem>
                            </Col>
                            <Col width="48px">
                                <ListItem
                                    style={{ height: "100%" }}
                                    modifier='material tappable'
                                    onClick={() => {
                                        if (false) {
                                            console.log("here")
                                            this.setState({ hideList: true })
                                            setTimeout(function () { this.setState({ removeList: true }) }.bind(this), 200);
                                            setTimeout(function () { this.props.toggleCompletion(component.id) }.bind(this), 250);
                                            setTimeout(function () { this.setState({ removeList: false }) }.bind(this), 300);
                                            setTimeout(function () { this.setState({ hideList: false }) }.bind(this), 350);
                                        } else {
                                            this.props.toggleCompletion(component.id);
                                        }
                                    }}
                                    className={this.props.componentCompletion[component.id] ? 'positive list-item--button' : 'list-item--button'}
                                >
                                    <FaCheck className="icon--center" />
                                    {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                </ListItem>
                            </Col>
                        </Row>
                    )} />
            </Fragment>
                :
                this.props.groups.map(group =>
                    <Fragment>
                        <div className={"list-heading"} style={{ color: this.fgOnlyColors[group.color] }}>{group.name}</div>
                        <List
                            dataSource={this.props.components}
                            renderRow={(component, idx) => (
                                component.group === group.id ?
                                    <Row>
                                        <Col>
                                            <ListItem
                                                modifier='material'
                                                className={this.props.componentCompletion[component.id] ? 'card--completed list-item__checkboxes ' : 'list-item__checkboxes'}
                                                style={{ backgroundColor: this.backgroundColors[groupColors[component.group]], color: this.colors[groupColors[component.group]] }}
                                            >
                                                <div className="checkbox-text">
                                                    {component.name}
                                                    {component.priority !== 0 ? this.priorityIcons[component.priority] : null}
                                                </div>
                                                {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                            </ListItem>
                                        </Col>
                                        <Col width="48px">
                                            <ListItem
                                                style={{ height: "100%" }}
                                                modifier='material tappable'
                                                onClick={() => {
                                                    if (false) {
                                                        console.log("here")
                                                        this.setState({ hideList: true })
                                                        setTimeout(function () { this.setState({ removeList: true }) }.bind(this), 200);
                                                        setTimeout(function () { this.props.toggleCompletion(component.id) }.bind(this), 250);
                                                        setTimeout(function () { this.setState({ removeList: false }) }.bind(this), 300);
                                                        setTimeout(function () { this.setState({ hideList: false }) }.bind(this), 350);
                                                    } else {
                                                        this.props.toggleCompletion(component.id);
                                                    }
                                                }}
                                                className={this.props.componentCompletion[component.id] ? 'positive list-item--button' : 'list-item--button'}
                                            >
                                                <FaCheck className="icon--center" />
                                                {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                            </ListItem>
                                        </Col>
                                    </Row>
                                    : null
                            )} />
                    </Fragment>

                )
        )
    }
}


export default connect(null, {})(TickboxesView)
