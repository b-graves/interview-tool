import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent, updateComponent } from '../../actions/components';
import { getGroups, deleteGroup, updateGroup } from '../../actions/groups';

import AddComponent from "./AddComponent"
import AddGroup from "./AddGroup"
import Dashboard from "./Dashboard"

import { Col, Row, List, ListItem, Button, Icon, ProgressCircular } from 'react-onsenui';

import { FaChevronUp, FaChevronDown, FaTrash, FaPen, FaSquareFull } from 'react-icons/fa';
import { IoIosColorFill } from 'react-icons/io';

export class ComponentGroups extends Component {
    static propTypes = {
        components: PropTypes.array.isRequired,
        getComponents: PropTypes.func.isRequired,
        deleteComponent: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getComponents(this.props.planId);
        this.props.getGroups(this.props.planId);
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

    findColor() {
        let color = 1;
        let usedColors = this.props.groups.map(group => group.color)
        console.log("usedColors")
        console.log(usedColors)
        while (usedColors.includes(color) ) {
            color += 1
        }
        color = color % this.colors.length
        return color
    }

    changeColor(group) {
        group.color = (group.color + 1) % this.colors.length 
        this.props.updateGroup(group)
    }


    render() {
        this.props.components.sort(function(a, b) { 
            return a.id - b.id;
        })

        this.props.groups.sort(function(a, b) { 
            return a.id - b.id;
        })
        let nextColor = this.findColor();
        return (
            <Fragment>
                { this.props.groups.map((group, groupIdx) =>
                        <div>
                            <Row>
                                <Col>
                                    <h3>
                                        <FaSquareFull 
                                            className="icon-color-marker"
                                            style={{"color": this.backgroundColors[group.color]}}
                                            onClick={() => this.changeColor(group)}
                                        />
                                        <div className="group-name">{group.name}</div>
                                    </h3>
                                </Col>
                                <Col width="44px">
                                    <h3 >
                                        <FaTrash onClick={()=>{this.props.deleteGroup(group.id);}} />
                                    </h3>
                                </Col>
                            </Row>
                            <List
                                dataSource={this.props.components}
                                renderRow={(component, idx) => (
                                    component.group === group.id ?
                                    <Row>
                                        <Col>
                                            <ListItem 
                                                modifier='material'
                                                style={{backgroundColor: this.backgroundColors[group.color], color: this.colors[group.color]}}
                                            >
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
                                <AddComponent planId={this.props.planId} groupId={group.id} />
                            </List>
                        </div>
                    )}
                    <AddGroup planId={this.props.planId} color={nextColor} first={this.props.groups.length == 0} />
                {/* : <ProgressCircular indeterminate /> } */}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    components: state.components.components,
    groups: state.groups.groups,
});

export default connect(mapStateToProps, { getComponents, deleteComponent, updateComponent, getGroups, deleteGroup, updateGroup })(ComponentGroups)
