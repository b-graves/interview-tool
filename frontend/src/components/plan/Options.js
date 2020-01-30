import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Session from '../session/Session'
import { Input, Button, Card } from 'react-onsenui';

import { FaPlus, FaMinus, FaStopwatch } from 'react-icons/fa';

export class Options extends Component {

    render() {
        return (
            <Fragment>
                <form style={{textAlign: "center"}}>
                    <Card>
                    <div className="title"><FaStopwatch className="header-icon--larger"/> Duration</div>
                    <Button
                        className="icon-in-button"
                        onClick={() => {
                            console.log("down")
                            this.props.updatePlan({...this.props.plan, duration: this.props.plan.duration > 0 ? this.props.plan.duration - 1 : 0})
                        }}
                        disabled={this.props.plan.duration < 0}
                    >
                        <FaMinus />
                    </Button>
                    <p className="duration">{this.props.plan.duration} Minutes</p>
                    <Button
                        className="icon-in-button"
                        onClick={() => {
                            console.log("up")
                            this.props.updatePlan({...this.props.plan, duration: this.props.plan.duration + 1})
                        }}
                    ><FaPlus /></Button>
                    </Card>
                </form>
            </Fragment>
        )
    }
}

export default connect(null, {})(Options)
