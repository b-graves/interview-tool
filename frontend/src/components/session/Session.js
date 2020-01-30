import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlan } from '../../actions/plans';
import { getParticipant } from '../../actions/participants';
import { getComponents } from '../../actions/components';

import { Tabbar, TabPage, Tab, Page, Navigator, Button, Toolbar, BackButton, ProgressCircular } from 'react-onsenui';
import Content from '../layout/Content';

import Components from "./Components";

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
        seconds: 0
    }

    render() {
        console.log(this.props)
        let remainingTime = 0;
        if (this.props.plan.duration && this.props.plan.duration * 60 - this.state.seconds > 0){
            remainingTime = this.props.plan.duration * 60 - this.state.seconds
        }
        console.log(remainingTime)
        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="right">
                        <BackButton>
                            Complete
                        </BackButton>
                    </div>
                    <div className="center">
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
                                color: '#fe0000',
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
                    <Content>
                        <Components components={this.props.components} planId={this.props.planId}/>
                    </Content>
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
