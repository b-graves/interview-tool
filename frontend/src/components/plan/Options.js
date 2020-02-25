import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Session from '../session/Session'
import { Input, Button, Card, Checkbox } from 'react-onsenui';

import { FaPlus, FaMinus, FaStopwatch, FaMicrophone, FaBalanceScale } from 'react-icons/fa';

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
                            onChange={event => { this.props.updatePlan({ ...this.props.plan, permitRecording: event.target.checked }) }}
                        />
                        <div className="explanation">When enabled, the interviewer will be able to audio record part or all of the session and review the recording afterwards</div>
                        <div style={{opacity: this.props.plan.permitRecording ? 1 : 0.3}}>
                            Start Recording Automatically  <Checkbox
                                modifier="material"
                                disabled={!this.props.plan.permitRecording}
                                checked={this.props.plan.permitRecording && this.props.plan.automaticRecording}
                                onChange={event => { this.props.updatePlan({ ...this.props.plan, automaticRecording: event.target.checked }) }}
                            />
                            <div className="explanation">When enabled, audio recording will begin automatically when the session starts and stop the session ends</div>
                        </div>
                    </Card>
                    <Card>
                        <div className="title"><FaBalanceScale className="header-icon--larger" /> Bias Reflection</div>
                        Bias Reflection <Checkbox
                            modifier="material"
                            checked={this.props.plan.biasReflection}
                            onChange={event => { this.props.updatePlan({ ...this.props.plan, biasReflection: event.target.checked }) }}
                        />
                        <div className="explanation">When enabled, the interviewer will be able to declare their preconcieved ideas about what they expect to uncover in each session. Then, following the session they will be able to reflect on shifts in their points of view based on the actual data collected, helping to overcome bias and improve interview integrity</div>
                    </Card>
                </form>
            </Fragment>
        )
    }
}

export default connect(null, {})(Options)
