import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent } from '../../actions/components'


import { Col, Row, List, ListItem, Button, Icon } from 'react-onsenui';

import { FaCheck } from 'react-icons/fa';

export class TickboxesView extends Component {

    render() {
        return (
            <Fragment>
                <Row>
                    <Col>
                        <List
                            dataSource={this.props.components}
                            renderRow={(component, idx) => (
                                <ListItem 
                                    modifier='material'
                                >
                                    {component.name}
                                    {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                </ListItem>
                            )}>
                                {/* <AddComponent planId={this.props.planId} /> */}
                        </List>
                    </Col>
                    <Col width="48px">
                        <List
                            dataSource={this.props.components}
                            renderRow={(component, idx) => (
                                <ListItem 
                                    modifier='material tappable'
                                    onClick={() => this.props.toggleCompletion(component.id)}
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
