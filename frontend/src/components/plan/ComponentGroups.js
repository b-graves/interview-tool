import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent, updateComponent } from '../../actions/components'

import AddComponent from "./AddComponent"
import Dashboard from "./Dashboard"

import { Col, Row, List, ListItem, Button, Icon, ProgressCircular } from 'react-onsenui';

import { FaChevronUp, FaChevronDown, FaTrash, FaPen, FaSquareFull } from 'react-icons/fa';

export class ComponentGroups extends Component {
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
        delete: false,
    }

    backgroundColors = ["#fff", "#e6001f", "#f8981d", "#090", "#1ea2e7", "#0e5eaa", "#a5007d"]
    backgroundColors = ["#fff", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]
    colors = ["#000", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]
    groups = ["White", "Purple", "Dark Blue", "Light Blue", "Green", "Yellow", "Red"]


    render() {
        this.props.components.sort(function(a, b) { 
            return a.id - b.id;
        })
        return (
            <Fragment>
                { this.backgroundColors.map((color, colorIdx) =>
                        <div>
                            <h3 style={{color: colorIdx > 0 ? color : "#000" }}>{this.groups[colorIdx]} Group</h3>
                            <List
                                dataSource={this.props.components}
                                renderRow={(component, idx) => (
                                    component.color === colorIdx ?
                                    <Row>
                                        <Col>
                                            <ListItem 
                                                modifier='material'
                                                style={{backgroundColor: color, color: this.colors[colorIdx]}}
                                            >
                                                {/* <FaSquareFull 
                                                    className="icon-color-marker"o
                                                    style={{"color": this.colors[component.color]}}
                                                    onClick={() => this.changeColor(component)}
                                                /> */}
                                                {component.name}
                                        
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
                                    :  null 
                                )}>
                                <AddComponent planId={this.props.planId} backgroundColor={color} color={this.colors[colorIdx]} colorIdx={colorIdx} />
                            </List>
                        </div>
                    )}
                {/* : <ProgressCircular indeterminate /> } */}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    components: state.components.components,
});

export default connect(mapStateToProps, { getComponents, deleteComponent, updateComponent })(ComponentGroups)
