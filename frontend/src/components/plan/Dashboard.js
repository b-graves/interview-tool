import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlan, deletePlan } from '../../actions/plans';
import { getParticipants } from '../../actions/participants';
import { getComponents } from '../../actions/components';

import { Tabbar, TabPage, Tab, Page, Navigator, Button, Toolbar, BackButton, ProgressCircular } from 'react-onsenui';
import Content from '../layout/Content';

import Components from "./Components";
import Participants from "./Participants";

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
                                        <Components planId={this.props.planId}/>
                                    </Content>
                                </Page>,
                                tab: <Tab><ion-icon name="chatboxes"></ion-icon> Components</Tab>
                                },
                                {
                                content: <Page title="Participants" active={activeIndex === 1} tabbar={tabbar}>
                                        <Content>
                                            <Participants planId={this.props.planId}/>
                                        </Content>
                                    </Page>,
                                tab: <Tab><ion-icon name="contacts"></ion-icon> Participants</Tab>
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

export default connect(mapStateToProps, { getPlan, deletePlan, getParticipants, getComponents })(Dashboard)
