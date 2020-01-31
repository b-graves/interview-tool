import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent } from '../../actions/components'


import { Col, Row, List, ListItem, Button, Icon } from 'react-onsenui';

import { FaCheck } from 'react-icons/fa';

export class TickboxesView extends Component {

    backgroundColors = ["#fff", "#e6001f", "#f8981d", "#090", "#1ea2e7", "#0e5eaa", "#a5007d"]
    colors = ["#000", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]

    state = {
        hideList: false,
        removeList: false,
    }

    render() {
        return (
            <Fragment>
                <Row>
                    <Col>
                        {this.state.removeList ? null : <List
                            className="hidable"
                            style={{opacity: this.state.hideList ? 0 : 1}}
                            dataSource={this.props.components}
                            renderRow={(component, idx) => (
                                <ListItem 
                                    modifier='material'
                                    className={this.props.componentCompletion[component.id] ? 'card--completed ' : ''}
                                    style={{backgroundColor: this.backgroundColors[component.color], color: this.colors[component.color]}}
                                >
                                    {component.name}
                                    {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                </ListItem>
                            )}>
                                {/* <AddComponent planId={this.props.planId} /> */}
                            </List> }
                    </Col>
                    <Col width="48px">
                        <List
                            dataSource={this.props.components}
                            renderRow={(component, idx) => (
                                <ListItem 
                                    modifier='material tappable'
                                    onClick={() => {
                                        if (this.props.hideCompletedComponents) {
                                            console.log("here")
                                            this.setState({hideList: true})
                                            setTimeout(function(){this.setState({removeList: true})}.bind(this), 200);
                                            setTimeout(function(){this.props.toggleCompletion(component.id)}.bind(this), 250);
                                            setTimeout(function(){this.setState({removeList: false})}.bind(this), 300);
                                            setTimeout(function(){this.setState({hideList: false})}.bind(this), 350);
                                        } else {
                                            this.props.toggleCompletion(component.id);
                                        }
                                    }}
                                    className={this.props.componentCompletion[component.id] ? 'positive list-item--button' :'list-item--button'}
                                >
                                    <FaCheck className="icon--center"/>
                                    {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                </ListItem>
                            )}>
                        </List>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}


export default connect(null, {})(TickboxesView)
