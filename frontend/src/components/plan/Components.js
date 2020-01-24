import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent } from '../../actions/components'

import AddComponent from "./AddComponent"
import Dashboard from "./Dashboard"

import { Col, Row, List, ListItem, Button, Icon } from 'react-onsenui';

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
                <List
                    dataSource={this.props.components}
                    renderRow={(component, idx) => (
                        <ListItem 
                            modifier='material tappable chevron'
                            onClick={() => this.openComponent(component.id)}
                        >
                            {component.name}
                            <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button>
                        </ListItem>
                    )}>
                        <AddComponent planId={this.props.planId} />
                </List>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    components: state.components.components,
});

export default connect(mapStateToProps, { getComponents, deleteComponent })(Components)
