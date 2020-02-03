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
import {IoIosApps} from 'react-icons/io';
import {MdBubbleChart} from 'react-icons/md';

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
        this.setState({componentCompletion})
    }

    state = {
        componentCompletion: this.generateCompletionState()
    }

    render() {
        let filteredComponents = this.props.components;

        if (this.props.useGroups) {
            filteredComponents.sort(function(a, b) { 
                return a.group - b.group;
            });
        } else {
            filteredComponents.sort(function(a, b) { 
                return a.id - b.id;
            });
        }

        if (this.props.hideCompletedComponents) {
            filteredComponents = filteredComponents.filter(component => !this.state.componentCompletion[component.id]);
        }

        return (
            this.props.components ?
                <div>
                    <Tabbar
                        onPreChange={({index}) => this.setState({index})}
                        onPostChange={() => console.log('postChange')}
                        onReactive={() => console.log('postChange')}
                        position='top'
                        index={this.state.index}
                        renderTabs={(activeIndex, tabbar) => [
                            {
                            content: <Page title="TickboxesView" active={activeIndex === 0} tabbar={tabbar}>
                                <Content>
                                    {this.props.hideList ? null : <TickboxesView useGroups={this.props.useGroups} components={filteredComponents} groups={this.props.groups} componentCompletion={this.state.componentCompletion} hideCompletedComponents={this.props.hideCompletedComponents} toggleCompletion={this.toggleCompletion.bind(this)} />}
                                </Content>
                            </Page>,
                            tab: <Tab><FaCheck className="ion-icon--larger" /> Tickboxes View</Tab>
                            },
                            {
                                content: <Page title="CardsView" active={activeIndex === 1} tabbar={tabbar}>
                                    <Content>
                                        <CardsView useGroups={this.props.useGroups} components={filteredComponents} groups={this.props.groups} componentCompletion={this.state.componentCompletion} toggleCompletion={this.toggleCompletion.bind(this)} columns={3} />
                                    </Content>
                                </Page>,
                                tab: <Tab><IoIosApps className="ion-icon--larger" /> Cards View</Tab>
                                },
                            {
                                content: <Page title="BubbleView" active={activeIndex === 2} tabbar={tabbar}>
                                    <BubbleView useGroups={this.props.useGroups} components={filteredComponents} groups={this.props.groups} componentCompletion={this.state.componentCompletion} toggleCompletion={this.toggleCompletion.bind(this)}  columns={3} />
                                </Page>,
                                tab: <Tab><MdBubbleChart className="ion-icon--larger" /> Bubble View</Tab>
                                }
                        ]
                        }
                    />
                </div>
            : <ProgressCircular indeterminate/>
        )
    }
}

export default connect(null, { })(Components)
