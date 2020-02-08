import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Responses from '../session/Responses';

import { getComponents, deleteComponent, updateComponent } from '../../actions/components';
import { getGroups } from '../../actions/groups';

import { Navigator, Page, Button, Toolbar, BackButton, Card } from 'react-onsenui';
import Content from '../layout/Content'

import { FiChevronUp, FiChevronDown, FiChevronsDown, FiChevronsUp, FiMinus } from 'react-icons/fi';

class SessionResults extends Component {

    componentDidMount() {
        this.props.getComponents(this.props.planId);
        this.props.getGroups(this.props.planId);
    }

    backgroundColors = ["#fff", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]
    colors = ["#000", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]

    priorityIcons = {
        "-2": <FiChevronsDown className="card-priority-icon" />,
        "-1": <FiChevronDown className="card-priority-icon" />,
        1: <FiChevronUp className="card-priority-icon" />,
        2: <FiChevronsUp className="card-priority-icon" />,
    }

    render() {
        let completedComponentCards = {}
        let groupColors = {}
        
        for (let i = 0; i < this.props.groups.length; i++) {
            groupColors[this.props.groups[i].id] = this.props.groups[i].color
        }

        if (this.props.components) {
            this.props.components.forEach((component, index) => {
                completedComponentCards[component.id] = <Card
                    style={{ backgroundColor: this.backgroundColors[groupColors[component.group]], color: this.colors[groupColors[component.group]] }}
                    className={'card__uniform'}
                >
                    <div className="title">
                        {component.name}
                        {component.priority !== 0 ? this.priorityIcons[component.priority] : null}
                    </div>
                </Card>
            })
        }

        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="left">
                        <BackButton>
                            Back
                        </BackButton>
                    </div>
                    <div className="center">
                        Interview Tool
                    </div>
                </Toolbar>}>
                <Content>
                    <Responses view={1} completedComponents={completedComponentCards} participant={this.props.participant} />
                </Content>
            </Page>
        )
    }
}

const mapStateToProps = state => ({
    components: state.components.components,
    groups: state.groups.groups
});


export default connect(mapStateToProps, { getComponents, deleteComponent, updateComponent, getGroups })(SessionResults)
