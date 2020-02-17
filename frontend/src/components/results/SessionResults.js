import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Responses from './Responses';

import { getComponents, deleteComponent, updateComponent } from '../../actions/components';
import { getGroups } from '../../actions/groups';

import { Navigator, Page, Button, Toolbar, BackButton, Card, Splitter, SplitterContent, SplitterSide } from 'react-onsenui';
import Content from '../layout/Content'

import { FiChevronUp, FiChevronDown, FiChevronsDown, FiChevronsUp, FiMinus } from 'react-icons/fi';

import { getResponses } from '../../actions/responses';

import Player from "./Player"

import { Timeline, Bookmark as Moment, Marker } from 'react-vertical-timeline';
import "react-vertical-timeline/style.css"

class SessionResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 50
        };

        this.increment = this.increment.bind(this);
        this.progressClick = this.progressClick.bind(this);
    }

    componentDidMount() {
        this.props.getComponents(this.props.planId);
        this.props.getGroups(this.props.planId);
        this.props.getResponses(this.props.participant.id);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    increment() {
        const progress = this.state.progress > 100 ? 0 : (this.state.progress + 1);
        this.setState({
            progress
        });
    }

    progressClick(progress) {
        this.setState({
            progress
        });
    }

    backgroundColors = ["#fff", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]
    colors = ["#000", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]

    priorityIcons = {
        "-2": <FiChevronsDown className="card-priority-icon" />,
        "-1": <FiChevronDown className="card-priority-icon" />,
        1: <FiChevronUp className="card-priority-icon" />,
        2: <FiChevronsUp className="card-priority-icon" />,
    }

    calculatePercentage(moment) {
        console.log(Math.round((moment / this.props.participant.duration) * 100))
        return Math.round((moment / this.props.participant.duration) * 100)
    }

    render() {
        let completedComponentCards = {}
        let completedComponentNames = {}
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
                completedComponentNames[component.id] = component.name;
            })
        }

        console.log(this.props.responses)

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
                <Splitter>
                    <SplitterContent>
                        <Page>
                            <Content>

                                <Responses view={1} completedComponents={completedComponentCards} participant={this.props.participant} />
                            </Content>
                        </Page>
                    </SplitterContent>
                    <SplitterSide
                        side="left"
                        width="20%"
                        isOpen={true}
                        style={{ backgroundColor: "#fafafa" }}
                        collapse={"split"}
                    >
                        <div>
                            <Timeline
                                height={700}
                                onSelect={this.progressClick}
                                progress={this.state.progress}
                            >
                                {this.props.responses.map(response =>
                                    <Moment onSelect={this.progressClick} progress={this.calculatePercentage(response.moment)}>
                                        {completedComponentNames[response.component]}
                                    </Moment>
                                )}
                            </Timeline>
                            <Moment onSelect={this.progressClick} progress={this.calculatePercentage(response.moment)}>
                                {completedComponentNames[response.component]}
                            </Moment>
                        </div>
                    </SplitterSide>
                </Splitter>
            </Page>
        )
    }
}

const mapStateToProps = state => ({
    components: state.components.components,
    groups: state.groups.groups,
    responses: state.responses.responses
});


export default connect(mapStateToProps, { getComponents, deleteComponent, updateComponent, getGroups, getResponses })(SessionResults)
