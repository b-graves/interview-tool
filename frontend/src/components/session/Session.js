import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlan, updatePlan } from '../../actions/plans';
import { getParticipant } from '../../actions/participants';
import { getComponents } from '../../actions/components';
import { getGroups } from '../../actions/groups';

import { Tabbar, TabPage, Tab, Page, Card, Navigator, Button, Toolbar, BackButton, ProgressCircular, Radio, ProgressBar, Splitter, SplitterContent, SplitterSide, Checkbox, List, ListItem } from 'react-onsenui';
import Content from '../layout/Content';

import Components from "./Components";


import { FaCheck, FaList } from 'react-icons/fa';

import { IoIosChatbubbles } from 'react-icons/io';
import { MdPeople } from 'react-icons/md';

import Timer from 'react-compound-timer'
import BubbleView from './BubbleView';

import ReactMinimalPieChart from 'react-minimal-pie-chart';

import {IoIosApps} from 'react-icons/io';
import {MdBubbleChart} from 'react-icons/md';

export class Session extends Component {
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
    }

    state = {
        index: 0,
        seconds: 0,
        isOpen: true,
        resize: false,
        useGroups: true,
        hideCompletedComponents: false
    }

    completeSession() {
        this.props.navigator.popPage();
    }

    hide() {
        this.setState({ resize: true, isOpen: false })
        setTimeout(function () { this.setState({ resize: false }) }.bind(this), 10);
    }

    show() {
        this.setState({ isOpen: true, resize: true })
        setTimeout(function () { this.setState({ resize: false }) }.bind(this), 10);
    }

    changeView(view) {
        let plan = this.props.plan;
        plan.view = view;
        this.props.updatePlan(plan);
    }

    render() {
        let remainingTime = 0;
        if (this.props.plan.duration && this.props.plan.duration * 60 - this.state.seconds > 0) {
            remainingTime = this.props.plan.duration * 60 - this.state.seconds
        }
        console.log(this.state.isOpen)

        return (
            <Page renderToolbar={() =>
                <Toolbar
                    style={{ height: "24px" }}
                    className="toolbar__narrow"
                >
                    <div className="center toolbar__session" >
                        {/* <Button onClick={() => this.state.isOpen ? this.hide() : this.show()}>open {this.state.isOpen}</Button> */}
                        {this.props.plan && this.props.participant ? "Session In Progress: " + this.props.plan.name + " - " + this.props.participant.name : ""}
                        <Timer
                            initialTime={0}
                            direction="forward"
                            lastUnit="m"
                        >
                            {({ getTime }) => {
                                let milliseconds = getTime();
                                let seconds = Math.floor(milliseconds / 1000);
                                if (seconds != this.state.seconds) {

                                    this.setState({ seconds });
                                }
                                return null
                                // return (minutes < 10 ? '0' : '') + minutes + ':' +(seconds < 10 ? '0' : '') + seconds
                            }}
                        </Timer>
                    </div>
                </Toolbar>}>
                {this.props.components ?
                    <Splitter>
                        <SplitterContent>
                            {this.state.resize ? null : <Components view={this.props.plan.view} components={this.props.components} groups={this.props.groups} planId={this.props.planId} hideList={this.state.hideList} useGroups={this.state.useGroups} hideCompletedComponents={this.state.hideCompletedComponents} />}
                        </SplitterContent>
                        <SplitterSide
                            side="right"
                            width={this.state.isOpen ? "20%" : "0%"}
                            isOpen={this.state.isOpen}
                            onClose={this.hide.bind(this)}
                            onOpen={this.show.bind(this)}
                            style={{ backgroundColor: "#fafafa" }}
                            swipeable={true}
                            collapse={"split"}>
                            <div>
                                <Card
                                    style={{ textAlign: "center" }}
                                >
                                    <ReactMinimalPieChart
                                        animate={true}
                                        className="timer"
                                        animationDuration={500}
                                        animationEasing="ease-out"
                                        cx={50}
                                        cy={50}
                                        data={[
                                            {
                                                color: '#009900',
                                                value: this.state.seconds
                                            },
                                            {
                                                color: '#f0eff4',
                                                value: remainingTime
                                            }
                                        ]}
                                        label={false}
                                        onClick={undefined}
                                        onMouseOut={undefined}
                                        onMouseOver={undefined}
                                        paddingAngle={0}
                                        radius={50}
                                        rounded={false}
                                        startAngle={-90}
                                        viewBoxSize={[
                                            100,
                                            100
                                        ]}
                                    />
                                    {Math.ceil(remainingTime / 60)} Minutes Left
                                </Card>
                                <Card
                                    className={this.state.useGroups ? "card__checkbox card__checkbox--selected" : "card__checkbox"}
                                    onClick={() => {
                                        this.setState({ useGroups: !this.state.useGroups, hideList: true })
                                        setTimeout(function () { this.setState({ hideList: false }) }.bind(this), 10);
                                    }}
                                >
                                    Show Stages <Checkbox modifier="material" checked={this.state.useGroups} />

                                </Card>
                                <Card
                                    className={this.state.hideCompletedComponents ? "card__checkbox card__checkbox--selected" : "card__checkbox"}
                                    onClick={() => {
                                        this.setState({ hideCompletedComponents: !this.state.hideCompletedComponents })
                                        // setTimeout(function(){this.setState({hideList: false})}.bind(this), 10);
                                    }}
                                >
                                    Filter completed <Checkbox modifier="material" checked={this.state.hideCompletedComponents} />
                                </Card>
                                <Card style={{padding: 0}}>
                                    <div style={{padding: "8px"}}>
                                        Component View
                                        <div
                                            style={{marginTop: "8px"}}
                                            className={this.props.plan.view == 0 ? "card__checkbox--selected radio-card" : " card__checkbox--unselected radio-card"}
                                            modifier="tappable"
                                            onClick={() => this.changeView(0)}
                                        >
                                            <FaList /> List
                                        </div>
                                        <div
                                            className={this.props.plan.view == 1 ? "card__checkbox--selected radio-card" : " card__checkbox--unselected radio-card"}
                                            modifier="tappable"
                                            onClick={() => this.changeView(1)}
                                        >
                                            <IoIosApps /> Cards
                                        </div>
                                        <div
                                            className={this.props.plan.view == 2 ? "card__checkbox--selected radio-card" : " card__checkbox--unselected radio-card"}
                                            modifier="tappable"
                                            onClick={() => this.changeView(2)}
                                        >
                                            <MdBubbleChart /> Bubbles
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <Button className="positive complete-button" onClick={() => this.completeSession()}>
                                <FaCheck className="icon-in-button" /> Complete Session
                            </Button>
                        </SplitterSide>
                    </Splitter>
                    : <ProgressCircular indeterminate />}
            </Page>
        )
    }
}

const mapStateToProps = state => ({
    plan: state.plans.plan,
    components: state.components.components,
    participant: state.participants.participant,
    groups: state.groups.groups,
});

export default connect(mapStateToProps, { getPlan, getParticipant, getComponents, getGroups, updatePlan })(Session)
