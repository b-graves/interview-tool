import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlans, deletePlan } from '../../actions/plans'

import Add from "./Add"
import Dashboard from "../plan/Dashboard"

import { Col, Row, List, ListItem, Button, Icon } from 'react-onsenui';

import { FaChevronUp, FaChevronDown, FaTrash, FaPen, FaBalanceScale, FaCheck, FaEllipsisH, FaPlay } from 'react-icons/fa';

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
        this.props.navigator.pushPage({ component: Dashboard, props: { planId } });
    }

    render() {
        return (
            <Fragment>
                <h1>Your Sessions Plans</h1>
                <Row>
                    <Col>
                        <List
                            dataSource={this.props.plans}
                            renderRow={(plan, idx) => (
                                <ListItem 
                                    modifier='material tappable chevron'
                                    onClick={() => this.openPlan(plan.id)}
                                >
                                    {plan.name}
                                </ListItem>
                            )}>
                        </List>
                    </Col>
                    <Col width="48px">
                            <List
                                dataSource={this.props.plans}
                                renderRow={(plan, idx) => (
                                    <ListItem 
                                        modifier='material tappable'
                                        className='list-item--button negative'
                                        onClick={this.props.deletePlan.bind(this, plan.id)}
                                    >
                                        <FaTrash className="icon--center"/>
                                    </ListItem>
                                )}>
                            </List>
                        </Col>
                </Row>
                <Add />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    plans: state.plans.plans
});

export default connect(mapStateToProps, { getPlans, deletePlan })(Plans)
