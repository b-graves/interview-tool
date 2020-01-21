import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlans, deletePlan } from '../../actions/plans'

export class Plans extends Component {
    static propTypes = {
        plans: PropTypes.array.isRequired,
        getPlans: PropTypes.func.isRequired,
        deletePlan: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getPlans();
    }

    render() {
        return (
            <Fragment>
                <h2>Plans</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.plans.map(plan => (
                            <tr>
                                <td>{plan.name}</td>
                                <td>
                                    <button onClick={this.props.deletePlan.bind(this, plan.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    plans: state.plans.plans
});

export default connect(mapStateToProps, { getPlans, deletePlan })(Plans)
