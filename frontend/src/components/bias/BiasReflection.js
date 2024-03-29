import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getResponses, updateResponse, deleteResponse } from '../../actions/responses';
import { getPlan } from '../../actions/plans';

import { getNotes } from '../../actions/notes';
import { getParticipant, updateParticipant } from '../../actions/participants';
import { getDeclarations, addDeclaration, updateDeclaration, deleteDeclaration } from '../../actions/declarations';

import { FiChevronUp, FiChevronDown, FiChevronsDown, FiChevronsUp, FiMinus } from 'react-icons/fi';

import { getComponents } from '../../actions/components';
import { getGroups } from '../../actions/groups';

import {Row,Col, Page, Card, Navigator, Button, Toolbar, Dialog, BackButton, ProgressCircular, Radio, ProgressBar, Splitter, SplitterContent, SplitterSide, Checkbox, List, ListItem } from 'react-onsenui';

import Content from '../layout/Content'

import BulletEditor from '../session/BulletEditor'


export class BiasReflection extends Component {
    static propTypes = {
        plan: PropTypes.object.isRequired,
        planId: PropTypes.number.isRequired,
        getPlan: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getResponses(this.props.participantId);
        this.props.getPlan(this.props.planId);
        this.props.getNotes(this.props.participantId);
        this.props.getComponents(this.props.planId);
        this.props.getGroups(this.props.planId);
        this.props.getDeclarations(this.props.participantId);
        this.props.getParticipant(this.props.participantId);
    }

    state = {

    }

    openComponent(componentId) {
        console.log(componentId)
    }

    changeColor(component) {
        component.color = (component.color + 1) % this.colors.length
        this.props.updateComponent(component)
    }

    state = {
        delete: false,
    }

    backgroundColors = ["#fff", "#e6001f", "#f8981d", "#090", "#1ea2e7", "#0e5eaa", "#a5007d"]
    backgroundColors = ["#fff", "#a5007d", "#0e5eaa", "#1ea2e7", "#090", "#f8981d", "#e6001f"]
    colors = ["#000", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]
    groups = ["White", "Purple", "Dark Blue", "Light Blue", "Green", "Yellow", "Red"]

    priorityIcons = {
        "-2": <FiChevronsDown className="card-priority-icon" />,
        "-1": <FiChevronDown className="card-priority-icon" />,
        1: <FiChevronUp className="card-priority-icon" />,
        2: <FiChevronsUp className="card-priority-icon" />,
    }

    findColor() {
        let color = 1;
        let usedColors = this.props.groups.map(group => group.color)
        while (usedColors.includes(color)) {
            color += 1
        }
        color = color % this.colors.length
        return color
    }

    changeColor(group) {
        group.color = (group.color + 1) % this.colors.length
        this.props.updateGroup(group)
    }

    changePriority(component, priority) {
        component.priority = priority;
        this.props.updateComponent(component)
    }


    render() {
        this.props.components.sort(function (a, b) {
            return a.id - b.id;
        })

        this.props.components.sort(function (a, b) {
            return b.priority - a.priority;
        })

        this.props.groups.sort(function (a, b) {
            return a.id - b.id;
        })
        let nextColor = this.findColor();

        let declarations = {};
        this.props.declarations.forEach(declaration => declarations[declaration.component] = declaration)

        this.props.responses.sort(function (a, b) {
            return a.id - b.id;
        })

        let responses = this.props.responses.filter(response => response.participant === this.props.participant.id)
        let notes = this.props.notes.filter(note => note.participant === this.props.participant.id)

        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="left">
                        <BackButton>
                            Back
                        </BackButton>
                    </div>
                    <div className="center">
                        {this.props.participant ? "Bias Declarations: " + this.props.participant.name : ""}
                    </div>
                </Toolbar>}>
                {this.props.groups.map((group, groupIdx) => {
                    return <Content>
                        <Row>
                            <Col>
                                <h3>
                                    <div>{group.name}</div>
                                </h3>
                            </Col>
                        </Row>
                        {this.props.components.map(component =>
                            component.group === group.id ?
                                <Row>
                                    <Col width="25%">
                                        <Card
                                            style={{ backgroundColor: this.backgroundColors[group.color], color: this.colors[group.color] }}
                                            className={'card__uniform'}
                                        >
                                            <div className="title">
                                                {component.name}
                                                {component.priority !== 0 ? this.priorityIcons[component.priority] : null}
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <div style={{padding: "10px 14px"}}>
                                        {declarations[component.id] ?
                                            <textarea 
                                                class="textarea textarea--transparent note-input"
                                                rows="6"
                                                placeholder="Type your thoughts here..."
                                                
                                                onBlur={event => {
                                                    this.props.updateDeclaration({ ...declarations[component.id], text: event.target.value });
                                                }}
                                            >
                                                {declarations[component.id].text}
                                            </textarea>
                                            :
                                        <div>No bias declared...</div>
                                        }
                                        </div>
                                    </Col>
                                    <Col>
                                        {responses.map(response =>
                                            response.component === component.id ? 
                                        <BulletEditor linked={response.linked} components={this.props.components} inSession={false} notes={notes.filter(note => note.response === response.id)} updateResponse={this.props.updateResponse} getTime={() => -1} response={response} />
                                        : null
                                        )}
                                    </Col>
                                </Row>
                                :
                                null
                        )}
                    </Content>
                })
                }
            </Page>
        )
    }
}

const mapStateToProps = state => ({
    plan: state.plans.plan,
    components: state.components.components,
    participant: state.participants.participant,
    groups: state.groups.groups,
    declarations: state.declarations.declarations,
    responses: state.responses.responses,
    notes: state.notes.notes
});

export default connect(mapStateToProps, { getPlan, getParticipant, getComponents, getGroups, getResponses, getNotes, updateParticipant, updateResponse, getDeclarations, addDeclaration, updateDeclaration, deleteDeclaration })(BiasReflection)
