import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlan, deletePlan, updatePlan } from '../../actions/plans';
import { getParticipants } from '../../actions/participants';
import { getComponents } from '../../actions/components';

import { Tabbar, TabPage, Tab, Page, Navigator, Button, Toolbar, BackButton, ProgressCircular } from 'react-onsenui';
import Content from '../layout/Content';

import Components from "./Components";
import ComponentGroups from "./ComponentGroups";
import Participants from "./Participants";
import Options from "./Options";

import { IoIosChatbubbles, IoIosOptions } from 'react-icons/io';
import { MdPeople } from 'react-icons/md';


export class Dashboard extends Component {
    static propTypes = {
        plan: PropTypes.object.isRequired,
        planId: PropTypes.number.isRequired,
        getPlan: PropTypes.func.isRequired,
        deletePlan: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getPlan(this.props.planId);
        this.props.getParticipants(this.props.planId);
        this.props.getComponents(this.props.planId);
    }

    updatePlan(plan) {
        this.props.updatePlan(plan)
    }

    state = {
        index: 0
    }

    render() {
        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="left">
                        <BackButton>
                            Back
                        </BackButton>
                    </div>
                    <div className="center">
                        {this.props.plan ? "Session Plan: " + this.props.plan.name : ""}
                    </div>
                </Toolbar>}>
                {this.props.plan ?
                    <div>
                        <Tabbar
                            onPreChange={({index}) => this.setState({index})}
                            onPostChange={() => console.log('postChange')}
                            onReactive={() => console.log('postChange')}
                            position='top'
                            index={this.state.index}
                            renderTabs={(activeIndex, tabbar) => [
                                {
                                content: <Page title="Components" active={activeIndex === 0} tabbar={tabbar}>
                                    <Content>
                                        <Components navigator={this.props.navigator} planId={this.props.planId}/>
                                    </Content>
                                </Page>,
                                tab: <Tab><IoIosChatbubbles className="ion-icon--larger" /> Components View A</Tab>
                                },
                                {
                                    content: <Page title="Groups" active={activeIndex === 0} tabbar={tabbar}>
                                        <Content>
                                            <ComponentGroups navigator={this.props.navigator} planId={this.props.planId}/>
                                        </Content>
                                    </Page>,
                                    tab: <Tab><IoIosChatbubbles className="ion-icon--larger" /> Components View B</Tab>
                                    },
                                {
                                    content: <Page title="Options" active={activeIndex === 1} tabbar={tabbar}>
                                        <Content>
                                            <Options navigator={this.props.navigator} plan={this.props.plan} updatePlan={this.updatePlan.bind(this)} />
                                        </Content>
                                    </Page>,
                                    tab: <Tab><IoIosOptions className="ion-icon--larger" /> Options</Tab>
                                    }, 
                                {
                                content: <Page title="Participants" active={activeIndex === 2} tabbar={tabbar}>
                                        <Content>
                                            <Participants navigator={this.props.navigator} planId={this.props.planId}/>
                                        </Content>
                                    </Page>,
                                tab: <Tab><MdPeople className="ion-icon--larger" /> Participants</Tab>
                                }]
                            }
                        />
                    </div>
                : <ProgressCircular indeterminate/>}
            </Page>
        )
    }
}

const mapStateToProps = state => ({
    plan: state.plans.plan
});

export default connect(mapStateToProps, { getPlan, deletePlan, getParticipants, getComponents, updatePlan })(Dashboard)
