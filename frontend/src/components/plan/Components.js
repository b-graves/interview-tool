import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent } from '../../actions/components'

import AddComponent from "./AddComponent"
import Dashboard from "./Dashboard"

import { Col, Row, List, ListItem, Button, Icon } from 'react-onsenui';

import { FaChevronUp, FaChevronDown, FaTrash, FaPen } from 'react-icons/fa';

export class Components extends Component {
    static propTypes = {
        components: PropTypes.array.isRequired,
        getComponents: PropTypes.func.isRequired,
        deleteComponent: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getComponents(this.props.planId);
    }

    openComponent(componentId) {
        console.log(componentId)
    }

    render() {
        console.log(this.props.planId)
        return (
            <Fragment>
                <Row>
                    <Col>
                        <List
                            dataSource={this.props.components}
                            renderRow={(component, idx) => (
                                <ListItem 
                                    modifier='material tappable'
                                    onClick={() => this.openComponent(component.id)}
                                >
                                    {component.name}
                                    {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                </ListItem>
                            )}>
                                {/* <AddComponent planId={this.props.planId} /> */}
                        </List>
                    </Col>
                    {/* <Col width="48px">
                        <List
                            dataSource={this.props.components}
                            renderRow={(component, idx) => (
                                <ListItem 
                                    modifier='material tappable'
                                    onClick={() => this.openComponent(component.id)}
                                >
                                    <FaPen />
                                </ListItem>
                            )}>
                        </List>
                    </Col> */}
                    {/* <Col width="48px">
                        <List
                            dataSource={this.props.components}
                            renderRow={(component, idx) => (
                                <ListItem 
                                    modifier='material tappable'
                                    onClick={() => this.openComponent(component.id)}
                                >
                                    <FaChevronUp />
                                </ListItem>
                            )}>
                        </List>
                    </Col>
                    <Col width="48px">
                        <List
                            dataSource={this.props.components}
                            renderRow={(component, idx) => (
                                <ListItem 
                                    modifier='material tappable'
                                    onClick={() => this.openComponent(component.id)}
                                >
                                    <FaChevronDown />
                                </ListItem>
                            )}>
                        </List>
                    </Col> */}
                    <Col width="48px">
                        <List
                            dataSource={this.props.components}
                            renderRow={(component, idx) => (
                                <ListItem 
                                    modifier='material tappable'
                                    onClick={this.props.deleteComponent.bind(this, component.id)}
                                    className='list-item--button negative'
                                >
                                    <FaTrash className="icon--center"/>
                                    {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                </ListItem>
                            )}>
                        </List>
                    </Col>
                </Row>
                <AddComponent planId={this.props.planId} />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    components: state.components.components,
});

export default connect(mapStateToProps, { getComponents, deleteComponent })(Components)