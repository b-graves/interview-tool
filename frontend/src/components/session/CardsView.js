import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent } from '../../actions/components'


import { Col, Row, Card, Tabbar, Tab, Page } from 'react-onsenui';

import { FaRegClipboard } from 'react-icons/fa';

import { FiChevronUp, FiChevronDown, FiChevronsDown, FiChevronsUp, FiMinus} from 'react-icons/fi';

import {IoIosApps} from 'react-icons/io';

import Content from '../layout/Content';

import Documentation from './Documentation'

export class TickboxesView extends Component {

    backgroundColors = ["#fff", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]
    colors = ["#000", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]
    
    fgOnlyColors =  ["#000", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]

    priorityIcons = {
        "-2" : <FiChevronsDown className="card-priority-icon" />,
        "-1" : <FiChevronDown className="card-priority-icon" />,
        1 : <FiChevronUp className="card-priority-icon" />,
        2 : <FiChevronsUp className="card-priority-icon" />,
    }

    state = {
        index: 0
    }
    

    render() {
        let columns = []
        let groupColumns = {}
        let groupIndex = {}
        let groupColors = {}
        if (!this.props.useGroups) {
            for (let i = 0; i < this.props.columns; i++) {
                columns.push([])
            }

            this.props.components.forEach((component, index) => {
                columns[index % this.props.columns].push(component)
            });
        } else {
            for (let i = 0; i < this.props.groups.length; i++) {
                groupColumns[this.props.groups[i].id] = []
                groupIndex[this.props.groups[i].id] = 0
                for (let j = 0; j < this.props.columns; j++) {
                    groupColumns[this.props.groups[i].id].push([])
                }
            }
            this.props.components.forEach((component, index) => {
                groupColumns[component.group][groupIndex[component.group]].push(component);
                groupIndex[component.group] = (groupIndex[component.group] + 1) % this.props.columns;
            });
        }

        for (let i = 0; i < this.props.groups.length; i++) {
            groupColors[this.props.groups[i].id] = this.props.groups[i].color
        }

        return (
            <Tabbar
                        onPreChange={({index}) => this.setState({index})}
                        onPostChange={() => console.log('postChange')}
                        onReactive={() => console.log('postChange')}
                        position='top'
                        index={this.state.index}
                        renderTabs={(activeIndex, tabbar) => [
                            {
                            content: <Page title="Cards" active={activeIndex === 0} tabbar={tabbar}>
                                <Content>
                                    {
                                        !this.props.useGroups ?
                                        <Row>
                                            {columns.map(column =>
                                                <Col>
                                                    {column.map(component =>
                                                        <Card
                                                            style={{ backgroundColor: this.backgroundColors[groupColors[component.group]], color: this.colors[groupColors[component.group]] }}
                                                            onClick={() => this.props.toggleCompletion(component.id)}
                                                            className={this.props.componentCompletion[component.id] ? 'card--completed card__uniform' : 'card__uniform'}
                                                        >
                                                            <div className="title">
                                                                {component.name}
                                                                {component.priority !== 0 ? this.priorityIcons[component.priority] : null}
                                                            </div>
                                                        </Card>
                                                    )}
                                                </Col>
                                            )}
                                        </Row>
                                        :
                                        <div>
                                            {this.props.groups.map(group =>
                                                <div>
                                                <div className={"cards-heading"} style={{ color: this.fgOnlyColors[group.color]}}>{group.name}</div>
                                                <Row>
                                                    {groupColumns[group.id].map(column =>
                                                        <Col>
                                                            {column.map(component =>
                                                                <Card
                                                                    style={{ backgroundColor: this.backgroundColors[group.color], color: this.colors[group.color] }}
                                                                    onClick={() => this.props.toggleCompletion(component.id)}
                                                                    className={this.props.componentCompletion[component.id] ? 'card--completed card__uniform' : 'card__uniform'}
                                                                >
                                                                    <div className="title">
                                                                        {component.name}
                                                                        {component.priority !== 0 ? this.priorityIcons[component.priority] : null}
                                                                    </div>
                                                                </Card>
                                                            )}
                                                        </Col>
                                                    )}
                                                </Row>
                                                </div>
                                            )}
                                        </div>
                                    }
                                </Content>
                            </Page>,
                            tab: <Tab><IoIosApps className="ion-icon--larger" /> Cards </Tab>
                            },
                            {
                                content: <Page title="Documentation" active={activeIndex === 1} tabbar={tabbar}>
                                    <Content>
                                        <Documentation />
                                    </Content>
                                </Page>,
                                tab: <Tab><FaRegClipboard className="ion-icon--larger" /> Documentation</Tab>
                                }
                            ]
                        }
                    />
            

        )

    }
}


export default connect(null, {})(TickboxesView)
