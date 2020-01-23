import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlan, deletePlan } from '../../actions/plans'

import { Navigator, Page, Button, Toolbar, BackButton, ProgressCircular } from 'react-onsenui';
import Content from '../layout/Content';

export class Dashboard extends Component {
    static propTypes = {
        plan: PropTypes.object.isRequired,
        planId: PropTypes.number.isRequired,
        getPlan: PropTypes.func.isRequired,
        deletePlan: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getPlan(this.props.planId);
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
                        Interview Tool
                    </div>
                </Toolbar>}>
                <Content>
                    <h1>{this.props.plan ? this.props.plan.name : <ProgressCircular indeterminate/>}</h1>
                </Content>
            </Page>
        )
    }
}

const mapStateToProps = state => ({
    plan: state.plans.plan
});

export default connect(mapStateToProps, { getPlan, deletePlan })(Dashboard)
