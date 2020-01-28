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
        index: 0
    }

    render() {
        console.log(this.props)
        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="left">
                        <BackButton>
                            Back
                        </BackButton>
                    </div>
                    <div className="center">
                        {this.props.plan && this.props.participant ? "Session In Progress: " + this.props.plan.name + " with "+this.props.participant.name: ""}
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
