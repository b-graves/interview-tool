import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlan } from '../../actions/plans';
import { getParticipant } from '../../actions/participants';
import { getComponents } from '../../actions/components';

import { Tabbar, TabPage, Tab, Page, Card, Navigator, Button, Toolbar, BackButton, ProgressCircular, ProgressBar, Splitter, SplitterContent, SplitterSide, Checkbox, List, ListItem } from 'react-onsenui';
import Content from '../layout/Content';

import Components from "./Components";


import { FaCheck } from 'react-icons/fa';

import { IoIosChatbubbles } from 'react-icons/io';
import { MdPeople } from 'react-icons/md';

import Timer from 'react-compound-timer'
import BubbleView from './BubbleView';

import ReactMinimalPieChart from 'react-minimal-pie-chart';

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
    }

    state = {
        index: 0,
        seconds: 0,
        isOpen: true,
        resize: false,
        orderByColor: false,
        hideCompletedComponents: false
    }

    completeSession() {
        this.props.navigator.popPage();
    }

    hide() {
        this.setState({resize: true, isOpen: false})
        setTimeout(function(){this.setState({resize: false})}.bind(this), 10);
      }
    
      show() {
        this.setState({ isOpen: true, resize: true})
        setTimeout(function(){this.setState({resize: false})}.bind(this), 10);
      }

    render() {
        let remainingTime = 0;
        if (this.props.plan.duration && this.props.plan.duration * 60 - this.state.seconds > 0){
            remainingTime = this.props.plan.duration * 60 - this.state.seconds
        }
        console.log(this.state.isOpen)

        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="right">
                    </div>
                    <div className="center">
                    {/* <Button onClick={() => this.state.isOpen ? this.hide() : this.show()}>open {this.state.isOpen}</Button> */}
                        {this.props.plan && this.props.participant ? "Session In Progress: " + this.props.plan.name + " with "+this.props.participant.name: ""}
                    </div>
                    <div className="left"> 
                        <Timer
                            initialTime={0}
                            direction="forward"
                            lastUnit="m"
                        >
                            {({getTime}) => {
                                let milliseconds = getTime();
                                let seconds = Math.floor(milliseconds / 1000);
                                if (seconds != this.state.seconds) {
                                    
                                    this.setState({seconds});
                                }
                                return null
                                // return (minutes < 10 ? '0' : '') + minutes + ':' +(seconds < 10 ? '0' : '') + seconds
                            }}
                        </Timer>
                        <ReactMinimalPieChart
                        animate={true}
                        className="timer"
                        animationDuration={500}
                        animationEasing="ease-out"
                        cx={50}
                        cy={50}
                        data={[
                            {
                                color: '#1f1f21',
                                value: this.state.seconds
                            },
                            {
                                color: '#ffffff',
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
                    </div>
                </Toolbar>}>
                    {this.props.components ?
                    <Splitter>
                        <SplitterContent>
                            {this.state.resize ? null : <Components components={this.props.components} planId={this.props.planId} hideList={this.state.hideList} orderByColor={this.state.orderByColor} hideCompletedComponents={this.state.hideCompletedComponents} />}
                        </SplitterContent>
                        <SplitterSide
                        side="right"
                        width={this.state.isOpen ? "20%" : "0%" }
                        isOpen={this.state.isOpen}
                        onClose={this.hide.bind(this)}
                        onOpen={this.show.bind(this)}
                        style={{backgroundColor: "#fafafa"}}
                        swipeable={true}
                        collapse={"split"}>
                            <div>
                                <Card
                                    className={this.state.orderByColor ? "card__checkbox card__checkbox--selected" : "card__checkbox"}
                                    onClick={() =>  {
                                        this.setState({orderByColor : !this.state.orderByColor, hideList: true})
                                        setTimeout(function(){this.setState({hideList: false})}.bind(this), 10);
                                        }}
                                >
                                Order by colour <Checkbox modifier="material" checked={this.state.orderByColor} />

                                </Card>
                                <Card 
                                    className={this.state.hideCompletedComponents ? "card__checkbox card__checkbox--selected" : "card__checkbox"}
                                    onClick={() =>  {
                                        this.setState({hideCompletedComponents : !this.state.hideCompletedComponents, hideList: true})
                                        setTimeout(function(){this.setState({hideList: false})}.bind(this), 10);
                                        }}
                                >
                                Filter completed <Checkbox modifier="material" checked={this.state.hideCompletedComponents} />
                                </Card>
                            </div>
                            <Button className="positive--quiet complete-button" modifier="quiet" onClick={() => this.completeSession()}>
                                <FaCheck className="icon-in-button"/> Complete
                            </Button>
                        </SplitterSide>
                    </Splitter>
                : <ProgressCircular indeterminate/>}
            </Page>
        )
    }
}

const mapStateToProps = state => ({
    plan: state.plans.plan,
    components: state.components.components,
    participant: state.participants.participant
});

export default connect(mapStateToProps, { getPlan, getParticipant, getComponents })(Session)
