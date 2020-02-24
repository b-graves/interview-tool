import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent } from '../../actions/components'

import { addResponse } from '../../actions/responses'



import { Col, Row, List, ListItem, Button, Card, Tabbar, Tab, Page } from 'react-onsenui';

import { FaRegClipboard } from 'react-icons/fa';

import Bubble from './Bubble';
import { Components } from '../plan/Components';

import { IoIosClose } from 'react-icons/io';
import { MdBubbleChart } from 'react-icons/md';

import Content from '../layout/Content';

import Documentation from './Documentation'

export class BubbleView extends Component {
    bubbleClick = (label) => {
        console.log(label)
    }

    pop = (component, pos) => {
        if (!this.props.componentCompletion[component.id]) {
            this.props.toggleCompletion(component.id);
            this.setState({highestGroup: component.group > this.state.highestGroup ? component.group : this.state.highestGroup, lastPopped: component, lastPos: pos})
            this.props.addResponse({
                participant: this.props.participant.id,
                component: component.id,
                moment: this.props.getTime()
            });
            setTimeout(function () { this.setState({ index: 1 }) }.bind(this), 500);
        } else {
            this.setState({ index: 1 })
        }
    }


    shuffle = (array) => {
        array.sort(() => Math.random() - 0.5);
        return array
    }

    makeBubbles = (components, groupColors) => {
        let rows = []


        components = components.filter(component => !this.props.componentCompletion[component.id]);

        // filter medium and low priority items from past groups
        let extras = components.filter(component => component.priority <= 0 && component.group < this.state.highestGroup);
        components = components.filter(component => component.priority > 0 || component.group >= this.state.highestGroup);

        components.sort(function (a, b) {
            return b.priority - a.priority;
        })

        components.sort(function (a, b) {
            return a.group - b.group;
        });

        components = components.concat(extras)

        if (this.state.lastPopped) {
            components = components.slice(0, this.state.lastPos).concat([this.state.lastPopped], components.slice(this.state.lastPos, 9))
        } else {
            components = components.slice(0, 10)
        }

        for (let i = 0; i < (Math.floor(components.length / 10) + 1); i++) {
            rows.push(
                <Row>
                    {[
                        <Col width={"45%"}>
                            {components.length > i * 10 + 0 ? <Bubble groupColors={groupColors} component={components[i * 10 + 0]} onClick={() => this.pop(components[i * 10 + 0], 0)} popped={this.props.componentCompletion[components[i * 10 + 0].id]} size={Math.max(20, Math.round((26 / components[i * 10 + 0].name.length) * 35))} width="80%" shiftRight={"15%"} /> : null}
                        </Col>,
                        <Col width={"20%"}>
                            {components.length > i * 10 + 3 ? <Bubble groupColors={groupColors} component={components[i * 10 + 3]} onClick={() => this.pop(components[i * 10 + 3], 3)} popped={this.props.componentCompletion[components[i * 10 + 3].id]} size={Math.max(11, Math.round((26 / components[i * 10 + 3].name.length) * 20))} width="100%" /> : null}
                            {components.length > i * 10 + 6 ? <Bubble groupColors={groupColors} component={components[i * 10 + 6]} onClick={() => this.pop(components[i * 10 + 6], 6)} popped={this.props.componentCompletion[components[i * 10 + 6].id]} size={Math.max(9, Math.round((30 / components[i * 10 + 6].name.length) * 15))} width="80%" shiftRight={"20px"} shiftDown={"15px"} /> : null}
                        </Col>,
                        <Col width={"35%"}>
                            {components.length > i * 10 + 1 ? <Bubble groupColors={groupColors} component={components[i * 10 + 1]} onClick={() => this.pop(components[i * 10 + 1], 1)} popped={this.props.componentCompletion[components[i * 10 + 1].id]} size={Math.max(19, Math.round((38 / components[i * 10 + 1].name.length) * 25))} /> : null}
                        </Col>
                    ]}
                </Row>
            )
            rows.push(
                <Row>
                    {[
                        <Col width={"25%"}>
                            {components.length > i * 10 + 4 ? <Bubble groupColors={groupColors} component={components[i * 10 + 4]} onClick={() => this.pop(components[i * 10 + 4], 4)} popped={this.props.componentCompletion[components[i * 10 + 4].id]} size={Math.max(13, Math.round((28 / components[i * 10 + 4].name.length) * 20))} /> : null}
                            {components.length > i * 10 + 9 ? <Bubble groupColors={groupColors} component={components[i * 10 + 9]} onClick={() => this.pop(components[i * 10 + 9], 9)} popped={this.props.componentCompletion[components[i * 10 + 9].id]} size={Math.max(7, Math.round((38 / components[i * 10 + 9].name.length) * 10))} width="50%" shiftRight={"70px"} shiftDown={"5px"} /> : null}
                        </Col>,
                        <Col width={"40%"}>
                            {components.length > i * 10 + 2 ? <Bubble groupColors={groupColors} component={components[i * 10 + 2]} onClick={() => this.pop(components[i * 10 + 2], 2)} popped={this.props.componentCompletion[components[i * 10 + 2].id]} size={Math.max(22, Math.round((47 / components[i * 10 + 2].name.length) * 25))} width="100%" /> : null}
                        </Col>,
                        <Col width={"20"}>
                            {components.length > i * 10 + 5 ? <Bubble groupColors={groupColors} component={components[i * 10 + 5]} onClick={() => this.pop(components[i * 10 + 5], 5)} popped={this.props.componentCompletion[components[i * 10 + 5].id]} size={Math.max(11, Math.round((35 / components[i * 10 + 5].name.length) * 15))} width="100%" /> : null}
                            {components.length > i * 10 + 8 ? <Bubble groupColors={groupColors} component={components[i * 10 + 8]} onClick={() => this.pop(components[i * 10 + 8], 8)} popped={this.props.componentCompletion[components[i * 10 + 8].id]} size={Math.max(9, Math.round((42 / components[i * 10 + 8].name.length) * 12))} width="80%" shiftRight={"20px"} shiftDown={"15px"} /> : null}
                        </Col>,
                        <Col width={"15"}>
                            {components.length > i * 10 + 7 ? <Bubble groupColors={groupColors} component={components[i * 10 + 7]} onClick={() => this.pop(components[i * 10 + 7], 7)} popped={this.props.componentCompletion[components[i * 10 + 7].id]} size={Math.max(8, Math.round((38 / components[i * 10 + 7].name.length) * 10))} shiftDown={"100px"} /> : null}
                        </Col>
                    ]}
                </Row>
            )
        }
        return rows;
    }

    state = {
        index: 0,
        highestGroup: 0,
        lastPopped: null,
        lastPos: null
    }

    fgOnlyColors = ["#000", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]

    render() {
        let groupColors = {};
        for (let i = 0; i < this.props.groups.length; i++) {
            groupColors[this.props.groups[i].id] = this.props.groups[i].color
        }

        let completedComponentBubbles = {}

        this.props.components.forEach((component, index) => {
            completedComponentBubbles[component.id] = <Card
                style={{ backgroundColor: "transparent", color: this.fgOnlyColors[groupColors[component.group]] }}
                className={'card__uniform'}
            >
                <div className="title">
                    {component.name}
                </div>
            </Card>
        });

        let suggestionBubbles = []
        let opacities = [1, 0.8, 0.6]
        let columnWidths = ["200px", "150px", "100px"]

        let fontSizes = [
            (component) => Math.max(13, Math.round((28 / component.name.length) * 23)),
            (component) => Math.max(11, Math.round((35 / component.name.length) * 15)),
            (component) => Math.max(8, Math.round((38 / component.name.length) * 10))
        ]

        this.props.suggestions.slice(0, 3).forEach((component, index) => {
            suggestionBubbles.push(
                <Row style={{ height: columnWidths[index], margin: "15px" }}>
                    <Col width={columnWidths[index]}>
                        <div style={{ opacity: opacities[index] }}>
                            <Bubble
                                groupColors={groupColors}
                                component={component}
                                popped={false}
                                onClick={() => {
                                    if (!this.props.componentCompletion[component.id]) {
                                        this.props.toggleCompletion(component.id);
                                        this.props.addResponse({
                                            participant: this.props.participant.id,
                                            component: component.id,
                                            moment: this.props.getTime()
                                        });
                                    }
                                    this.setState({ index: 1 })
                                }}
                                size={fontSizes[index](component)}
                            />
                        </div>
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
                        content: <Page title="Bubbles" active={activeIndex === 0} tabbar={tabbar}>
                            <div style={{ padding: "1% 2%" }}>
                                {this.makeBubbles(this.props.components, groupColors)}
                            </div>
                        </Page>,
                        tab: <Tab><MdBubbleChart className="ion-icon--larger" /> Components</Tab>
                    },
                    {
                        content: <Page title="Documentation" active={activeIndex === 1} tabbar={tabbar} id="documentationContainer">
                            <Content>
                                <Documentation getTime={this.props.getTime} toggleCompletion={this.props.toggleCompletion} view={2} suggestions={suggestionBubbles} completedComponents={completedComponentBubbles} participant={this.props.participant} />
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

export default connect(null, { addResponse })(BubbleView)
