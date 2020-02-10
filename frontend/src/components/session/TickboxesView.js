import { Col, List, ListItem, Page, Row, Tab, Tabbar } from 'react-onsenui';
import { FaCheck, FaRegClipboard } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp, FiChevronsDown, FiChevronsUp, FiMinus } from 'react-icons/fi';
import { IoIosApps, IoIosClose } from 'react-icons/io';
import React, { Component, Fragment } from 'react';
import { deleteComponent, getComponents } from '../../actions/components'
import { addResponse } from '../../actions/responses'

import Content from '../layout/Content';
import Documentation from './Documentation'
import { FaList } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class TickboxesView extends Component {

    backgroundColors = ["#fff", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]
    colors = ["#000", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]

    fgOnlyColors = ["#000", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]

    state = {
        hideList: false,
        removeList: false,
    }

    priorityIcons = {
        "-2": <FiChevronsDown className="list-priority-icon" />,
        "-1": <FiChevronDown className="list-priority-icon" />,
        1: <FiChevronUp className="list-priority-icon" />,
        2: <FiChevronsUp className="list-priority-icon" />,
    }


    render() {
        let groupColors = {}

        for (let i = 0; i < this.props.groups.length; i++) {
            groupColors[this.props.groups[i].id] = this.props.groups[i].color
        }

        let completedComponentItems = {}

        this.props.components.forEach((component, index) => {
            completedComponentItems[component.id] = <ListItem
                modifier='material'
                className={'list-item__checkboxes'}
                style={{ backgroundColor: this.backgroundColors[groupColors[component.group]], color: this.colors[groupColors[component.group]] }}
            >
                <div className="checkbox-text">{
                    component.name}
                    {component.priority !== 0 ? this.priorityIcons[component.priority] : null}
                </div>
                {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
            </ListItem>
        })

        let suggestionItems = []
        let opacities = [0.9, 0.7, 0.5]
        let widths = ["86%", "83%", "80%"]
        let columnWidths = ["88%", "85%", "82%"]
        
        this.props.suggestions.slice(0, 3).forEach((component, index) => {
            suggestionItems.push(
                <Row style={{ height: "48px", margin: "4px" }}>
                    <Col width={columnWidths[index]}>
                        <ListItem
                            modifier='material'
                            className={'list-item__checkboxes suggestion-item'}
                            onClick={() => {
                                if (!this.props.componentCompletion[component.id]) {
                                    this.props.toggleCompletion(component.id);
                                    this.props.addResponse({
                                        participant: this.props.participant.id,
                                        component: component.id,
                                    });
                                }
                                this.setState({ index: 1 })
                            }}
                            style={{ backgroundColor: this.backgroundColors[groupColors[component.group]], color: this.colors[groupColors[component.group]], opacity: opacities[index], width: widths[index] }}
                        >
                            <div className="checkbox-text">{
                                component.name}
                                {component.priority !== 0 ? this.priorityIcons[component.priority] : null}
                            </div>
                            {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                        </ListItem>
                    </Col>
                    <IoIosClose
                        style={{ fontSize: "200%", margin: "auto 0", color: "grey" }}
                        onClick={() => this.props.dismissSuggestion(component.id)}
                    />
                </Row>
            )
        })

        return (
            <Tabbar
                onPreChange={({ index }) => this.setState({ index })}
                onPostChange={() => console.log('postChange')}
                onReactive={() => console.log('postChange')}
                position='top'
                index={this.state.index}
                renderTabs={(activeIndex, tabbar) => [
                    {
                        content: <Page title="Cards" active={activeIndex === 0} tabbar={tabbar}>
                            <Content>
                                {
                                    !this.props.useGroups ? <Fragment>
                                        <List
                                            dataSource={this.props.components}
                                            renderRow={(component, idx) => (
                                                <Row>
                                                    <Col>
                                                        <ListItem
                                                            modifier={!this.props.componentCompletion[component.id] ? 'material tappable chevron' : 'material'}
                                                            className={this.props.componentCompletion[component.id] ? 'card--completed list-item__checkboxes ' : 'list-item__checkboxes'}
                                                            style={{ backgroundColor: this.backgroundColors[groupColors[component.group]], color: this.colors[groupColors[component.group]] }}
                                                            onClick={() => {
                                                                if (!this.props.componentCompletion[component.id]) {
                                                                    this.props.toggleCompletion(component.id);
                                                                    this.props.addResponse({
                                                                        participant: this.props.participant.id,
                                                                        component: component.id,
                                                                    });
                                                                }
                                                                this.setState({ index: 1 })
                                                            }}
                                                        >
                                                            <div className="checkbox-text">{
                                                                component.name}
                                                                {component.priority !== 0 ? this.priorityIcons[component.priority] : null}
                                                            </div>
                                                            {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                                        </ListItem>
                                                    </Col>
                                                    {this.props.componentCompletion[component.id] ?
                                                        <Col width="48px">
                                                            <ListItem
                                                                style={{ height: "100%" }}
                                                                modifier='material tappable'
                                                                onClick={() => {
                                                                    if (!this.props.componentCompletion[component.id]) {
                                                                        this.props.toggleCompletion(component.id);
                                                                        this.props.addResponse({
                                                                            participant: this.props.participant.id,
                                                                            component: component.id,
                                                                        });
                                                                    }
                                                                    this.setState({ index: 1 })
                                                                }}
                                                                className={this.props.componentCompletion[component.id] ? 'positive list-item--button' : 'list-item--button'}
                                                            >
                                                                <FaCheck className="icon--center" />
                                                                {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                                            </ListItem>
                                                        </Col>
                                                        : null}
                                                </Row>
                                            )} />
                                    </Fragment>
                                        :
                                        this.props.groups.map(group =>
                                            <Fragment>
                                                <div className={"list-heading"} style={{ color: this.fgOnlyColors[group.color] }}>{group.name}</div>
                                                <List
                                                    dataSource={this.props.components}
                                                    renderRow={(component, idx) => (
                                                        component.group === group.id ?
                                                            <Row>
                                                                <Col>
                                                                    <ListItem
                                                                        modifier={!this.props.componentCompletion[component.id] ? 'material tappable chevron' : 'material'}
                                                                        className={this.props.componentCompletion[component.id] ? 'card--completed list-item__checkboxes ' : 'list-item__checkboxes'}
                                                                        style={{ backgroundColor: this.backgroundColors[groupColors[component.group]], color: this.colors[groupColors[component.group]] }}
                                                                        onClick={() => {
                                                                            if (!this.props.componentCompletion[component.id]) {
                                                                                this.props.toggleCompletion(component.id);
                                                                                this.props.addResponse({
                                                                                    participant: this.props.participant.id,
                                                                                    component: component.id,
                                                                                });
                                                                            }
                                                                            this.setState({ index: 1 })
                                                                        }}
                                                                    >
                                                                        <div className="checkbox-text">
                                                                            {component.name}
                                                                            {component.priority !== 0 ? this.priorityIcons[component.priority] : null}
                                                                        </div>
                                                                        {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                                                    </ListItem>
                                                                </Col>
                                                                {this.props.componentCompletion[component.id] ?
                                                                    <Col width="48px">
                                                                        <ListItem
                                                                            style={{ height: "100%" }}
                                                                            modifier='material tappable'
                                                                            onClick={() => {
                                                                                this.setState({ index: 1 })
                                                                            }}
                                                                            className={this.props.componentCompletion[component.id] ? 'positive list-item--button' : 'list-item--button'}
                                                                        >
                                                                            <FaCheck className="icon--center" />
                                                                            {/* <Button modifier="quiet" onClick={this.props.deleteComponent.bind(this, component.id)}>Remove</Button> */}
                                                                        </ListItem>
                                                                    </Col>
                                                                    : null}
                                                            </Row>
                                                            : null
                                                    )} />
                                            </Fragment>

                                        )
                                }
                            </Content>
                        </Page>,
                        tab: <Tab><FaList className="ion-icon--larger" /> Components</Tab>
                    },
                    {
                        content: <Page title="Documentation" active={activeIndex === 1} tabbar={tabbar}>
                            <Content>
                                <Documentation view={0} suggestions={suggestionItems} completedComponents={completedComponentItems} participant={this.props.participant} />
                            </Content>
                        </Page>,
                        tab: <Tab><FaRegClipboard className="ion-icon--larger" /> Notes</Tab>
                    }
                ]
                }
            />
        )
    }
}


export default connect(null, { addResponse })(TickboxesView)
