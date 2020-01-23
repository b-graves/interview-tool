import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlans, deletePlan } from '../../actions/plans'

import Add from "./Add"
import Dashboard from "../plan/Dashboard"

import { Col, Row, List, ListItem, Button, Icon } from 'react-onsenui';

export class Plans extends Component {
    static propTypes = {
        plans: PropTypes.array.isRequired,
        getPlans: PropTypes.func.isRequired,
        deletePlan: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getPlans();
    }

    openPlan(planId) {
        console.log(planId)
        this.props.navigator.pushPage({ component: Dashboard, props: { planId } });
    }

    render() {
        return (
            <Fragment>
                <h1>Session Plans</h1>
                <List
                    dataSource={this.props.plans}
                    renderRow={(plan, idx) => (
                        <ListItem 
                            modifier='material tappable chevron'
                            onClick={() => this.openPlan(plan.id)}
                        >
                            {plan.name}
                            <Button modifier="quiet" onClick={this.props.deletePlan.bind(this, plan.id)}>Remove</Button>
                        </ListItem>
                    )}>
                        <Add />
                </List>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    plans: state.plans.plans
});

export default connect(mapStateToProps, { getPlans, deletePlan })(Plans)
