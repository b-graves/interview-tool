import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlan, updatePlan } from '../../actions/plans';
import { getParticipant, updateParticipant } from '../../actions/participants';
import { getDeclarations, addDeclaration, updateDeclaration, deleteDeclaration } from '../../actions/declarations';

import { FiChevronUp, FiChevronDown, FiChevronsDown, FiChevronsUp, FiMinus } from 'react-icons/fi';

import { getComponents } from '../../actions/components';
import { getGroups } from '../../actions/groups';

import { Row, Col, Page, Card, Navigator, Button, Toolbar, Dialog, BackButton, ProgressCircular, Radio, ProgressBar, Splitter, SplitterContent, SplitterSide, Checkbox, List, ListItem } from 'react-onsenui';

import Content from '../layout/Content'

import Help from "../Help";


export class BiasDeclaration extends Component {
    static propTypes = {
        plan: PropTypes.object.isRequired,
        planId: PropTypes.number.isRequired,
        getPlan: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getPlan(this.props.planId);
        this.props.getComponents(this.props.planId);
        this.props.getParticipant(this.props.participantId);
        this.props.getGroups(this.props.planId);
        this.props.getDeclarations(this.props.participantId);
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

        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="left">
                        <BackButton>
                            Back
                        </BackButton>
                    </div>
                    <div className="center">
                        {this.props.participant ? "Expectations: " + this.props.participant.name : ""}
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
                                        <div style={{ padding: "20px" }}>
                                            {declarations[component.id] ?
                                                <div>
                                                    How do you expect the interviewee to respond?
                                            <textarea
                                                        class="textarea textarea--transparent note-input"
                                                        rows="4"
                                                        placeholder="Type your thoughts here..."

                                                        onBlur={event => {
                                                            this.props.updateDeclaration({ ...declarations[component.id], text: event.target.value });
                                                        }}
                                                    >
                                                        {declarations[component.id].text}
                                                    </textarea>
                                                </div>
                                                :
                                                <div>
                                                    <Button modifier={"quiet"} onClick={() => this.props.addDeclaration({ participant: this.props.participantId, component: component.id })}>Add Expectations</Button>
                                                    <Help text="Adding expectations gives you the opportunity to express before the session how you expect the interviewee to respond. This may not be relevant for all types of session but it may be useful for reflecting on points of view and bias mitigation in areas such as qualitative research." />
                                                </div>
                                            }
                                        </div>
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
    declarations: state.declarations.declarations
});

export default connect(mapStateToProps, { getPlan, getParticipant, getComponents, getGroups, updatePlan, updateParticipant, getDeclarations, addDeclaration, updateDeclaration, deleteDeclaration })(BiasDeclaration)
