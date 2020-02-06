import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents } from '../../actions/components'

import TickboxesView from './TickboxesView';
import CardsView from './CardsView';
import BubbleView from './BubbleView';

import { Tabbar, Page, ProgressCircular, Tab } from 'react-onsenui';

import Content from '../layout/Content';

import { FaCheck } from 'react-icons/fa';
import { IoIosApps } from 'react-icons/io';
import { MdBubbleChart } from 'react-icons/md';


export class Components extends Component {
    generateCompletionState() {
        let componentCompletion = {}
        this.props.components.forEach(component => {
            componentCompletion[component.id] = false;
        });
        return componentCompletion;
    }

    toggleCompletion(componentId) {
        let componentCompletion = this.state.componentCompletion;
        componentCompletion[componentId] = !componentCompletion[componentId]
        this.setState({ componentCompletion })
    }

    state = {
        componentCompletion: this.generateCompletionState()
    }

    render() {
        let filteredComponents = this.props.components;

        if (this.props.useGroups) {
            filteredComponents.sort(function (a, b) {
                return a.group - b.group;
            });
        } else {
            filteredComponents.sort(function (a, b) {
                return a.id - b.id;
            });
        }

        if (this.props.hideCompletedComponents) {
            filteredComponents = filteredComponents.filter(component => !this.state.componentCompletion[component.id]);
        }

        filteredComponents.sort(function (a, b) {
            return b.priority - a.priority;
        })

        return (
            this.props.components ?
                this.props.view === 0 ?
                    <Content>
                        {this.props.hideList ? null : <TickboxesView useGroups={this.props.useGroups} components={filteredComponents} groups={this.props.groups} componentCompletion={this.state.componentCompletion} hideCompletedComponents={this.props.hideCompletedComponents} toggleCompletion={this.toggleCompletion.bind(this)} />}
                    </Content>
                    : this.props.view === 1 ?
                        <Content>
                            <CardsView useGroups={this.props.useGroups} components={filteredComponents} groups={this.props.groups} componentCompletion={this.state.componentCompletion} toggleCompletion={this.toggleCompletion.bind(this)} columns={3} />
                        </Content>
                        :
                        <BubbleView useGroups={this.props.useGroups} components={filteredComponents} groups={this.props.groups} componentCompletion={this.state.componentCompletion} toggleCompletion={this.toggleCompletion.bind(this)} columns={3} />


                : <ProgressCircular indeterminate />
        )
    }
}

export default connect(null, {})(Components)
