import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent, updateComponent } from '../../actions/components'

import AddComponent from "./AddComponent"
import Dashboard from "./Dashboard"

import { Col, Row, List, ListItem, Button, Icon, ProgressCircular } from 'react-onsenui';

import { FaChevronUp, FaChevronDown, FaTrash, FaPen, FaSquareFull } from 'react-icons/fa';

export class Components extends Component {
    static propTypes = {
        components: PropTypes.array.isRequired,
        getComponents: PropTypes.func.isRequired,
        deleteComponent: PropTypes.func.isRequired,
    }
    
    colors = ["#f0eff4", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]

    componentDidMount() {
        this.props.getComponents(this.props.planId);
    }

    openComponent(componentId) {
        console.log(componentId)
    }

    changeColor(component) {
        console.log(component.id)
        console.log(component.color)
        console.log(this.colors[component.color])
        component.color = (component.color + 1) % this.colors.length 
        console.log(component.color)
        console.log(this.colors[component.color])
        this.props.updateComponent(component)
    }

    state = {
        delete: false
    }

    render() {
        this.props.components.sort(function(a, b) { 
            return a.id - b.id;
        })
        console.log(this.props.components)
        return (
            <Fragment>
                {/* { !this.state.delete ? */}
                        <List
                            dataSource={this.props.components}
                            renderRow={(component, idx) => (
                                <Row>
                                    <Col>
                                        <ListItem 
                                            modifier='material'
                                        >
                                            <FaSquareFull 
                                                className="icon-color-marker"
                                                style={{"color": this.colors[component.color]}}
                                                onClick={() => this.changeColor(component)}
                                            />
                                            <div className="component-name">{component.name}</div>
                                            {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                    
                                        </ListItem>
                                    </Col>
                                    <Col width="44px">
                                        <ListItem
                                            style={{height: "100%"}}
                                            modifier='material tappable'
                                            onClick={()=>{
                                                this.setState({delete: true})
                                                this.props.deleteComponent(component.id);
                                                setTimeout(function(){this.setState({delete: false})}.bind(this), 100);
                                            }}
                                            className='list-item--button negative'
                                        >
                                            <FaTrash className="icon--center"/>
                                            {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                        </ListItem>
                                    </Col>
                                </Row>
                            )}>
                                {/* <AddComponent planId={this.props.planId} /> */}
                        </List>
                {/* : <ProgressCircular indeterminate /> } */}
                <AddComponent planId={this.props.planId} />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    components: state.components.components,
});

export default connect(mapStateToProps, { getComponents, deleteComponent, updateComponent })(Components)
