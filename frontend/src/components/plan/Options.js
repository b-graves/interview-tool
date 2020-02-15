import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Session from '../session/Session'
import { Input, Button, Card, Checkbox } from 'react-onsenui';

import { FaPlus, FaMinus, FaStopwatch, FaMicrophone } from 'react-icons/fa';

export class Options extends Component {

    render() {
        return (
            <Fragment>
                <form style={{ textAlign: "center" }}>
                    <Card>
                        <div className="title"><FaStopwatch className="header-icon--larger" /> Duration</div>
                        <Button
                            onClick={() => {
                                this.props.updatePlan({ ...this.props.plan, duration: this.props.plan.duration > 0 ? this.props.plan.duration - 1 : 0 })
                            }}
                            disabled={this.props.plan.duration < 0}
                            modifier="quiet"
                        >
                            <FaMinus className="icon-in-button" />
                        </Button>
                        <p className="duration">{this.props.plan.duration} Minutes</p>
                        <Button
                            onClick={() => {
                                this.props.updatePlan({ ...this.props.plan, duration: this.props.plan.duration + 1 })
                            }}
                            modifier="quiet"
                        ><FaPlus className="icon-in-button" /></Button>
                    </Card>
                    <Card>
                        <div className="title"><FaMicrophone className="header-icon--larger" /> Audio Recording</div>
                        Permit Audio Recording <Checkbox
                            modifier="material"
                            checked={this.props.plan.permitRecording} 
                            onChange={event => { this.props.updatePlan({ ...this.props.plan, permitRecording: event.target.checked })}}
                        />
                    </Card>
                </form>
            </Fragment>
        )
    }
}

export default connect(null, {})(Options)
