import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParticipants, deleteParticipant } from '../../actions/participants'

import AddParticipant from "./AddParticipant"
import Dashboard from "./Dashboard"

import { Col, Row, List, ListItem, Button, Icon, ListHeader, ProgressBar } from 'react-onsenui';

import { FaChevronUp, FaChevronDown, FaTrash, FaPen, FaBalanceScale, FaCheck, FaEllipsisH, FaPlay } from 'react-icons/fa';
import { GiDiscussion } from 'react-icons/gi';
import { MdPerson } from 'react-icons/md';

import SessionResults from '../results/SessionResults'

import Session from '../session/Session'
import BiasDeclaration from '../bias/BiasDeclaration'
import BiasReflection from '../bias/BiasReflection'

export class Participants extends Component {
    static propTypes = {
        participants: PropTypes.array.isRequired,
        getParticipants: PropTypes.func.isRequired,
        deleteParticipant: PropTypes.func.isRequired,
    }

    participantDidMount() {
        this.props.getParticipants(this.props.planId);
    }

    openParticipant(participant) {
        this.props.navigator.pushPage({ component: SessionResults, props: { participant, planId: this.props.planId } });
    }

    startSession(participantId, planId) {
        this.props.navigator.pushPage({ component: Session, props: { participantId, planId, duration: 100 } });
    }

    startBiasDeclaration(participantId, planId) {
        this.props.navigator.pushPage({ component: BiasDeclaration, props: { participantId, planId } });
    }

    startBiasReflection(participantId, planId) {
        this.props.navigator.pushPage({ component: BiasReflection, props: { participantId, planId } });
    }

    state = {
        delete: false
    }

    render() {22
        this.props.participants.sort(function (a, b) {
            return b.id - a.id;
        })

        return (
            <Fragment>
                <AddParticipant planId={this.props.planId} />
                {this.props.participants.length > 0 && !this.state.delete ?
                    <List
                        dataSource={this.props.participants}
                        renderRow={(participant, idx) => (
                            <Row>
                                <Col>
                                    <ListItem
                                        modifier={participant.complete ? 'material tappable chevron' : 'material'}
                                        onClick={() => this.openParticipant(participant)}
                                    >
                                        {participant.name}
                                        {/* <Button modifier="quiet" onClick={this.props.deleteParticipant.bind(this, participant.id)}>Remove</Button> */}
                                    </ListItem>
                                </Col>
                                {this.props.plan.biasReflection && !participant.complete ?
                                    <Col width="178px">
                                        <ListItem
                                            style={{ textAlign: "center", alignItems: "flex-start" }}
                                            modifier='material tappable'
                                            className='list-item--button orange'
                                            onClick={() => this.startBiasDeclaration(participant.id, this.props.planId)}
                                        >
                                            {/* {Math.random() > 0.5 ? <FaCheck className="icon--center" style={{color: "green"}} /> : <FaEllipsisH className="icon--center" />} */}
                                            <div style={{ textAlign: "center", alignItems: "flex-start", width: "100%" }}>
                                                <FaBalanceScale
                                                    className="button-icon"
                                                /> Expectations
                                            </div>
                                            {/* <Button modifier="quiet" onClick={this.props.deleteParticipant.bind(this, participant.id)}>Remove</Button> */}
                                        </ListItem>
                                    </Col>
                                    : null
                                }
                                <Col width="156px">
                                    {!participant.complete ?
                                        <ListItem
                                            style={{ textAlign: "center", alignItems: "flex-start" }}
                                            modifier='material tappable'
                                            className='list-item--button positive'
                                            onClick={() => this.startSession(participant.id, this.props.planId)}
                                        >
                                            {/* {Math.random() > 0.5 ? <FaCheck className="icon--center" style={{color: "green"}} /> : <FaEllipsisH className="icon--center" />} */}
                                            <div style={{ textAlign: "center", alignItems: "flex-start", width: "100%" }}>
                                                <FaPlay
                                                    className="button-icon"
                                                /> Start Session
                                            </div>
                                            {/* <Button modifier="quiet" onClick={this.props.deleteParticipant.bind(this, participant.id)}>Remove</Button> */}
                                        </ListItem>
                                        :
                                        <ListItem
                                            style={{ textAlign: "center", alignItems: "flex-start" }}
                                            modifier='material'
                                            className='list-item--button neutral'
                                        >
                                            <div style={{ textAlign: "center", alignItems: "flex-start", width: "100%" }}>
                                                <FaCheck
                                                    className="button-icon"
                                                /> Complete
                                            </div>
                                        </ListItem>
                                    }
                                </Col>
                                <Col width="48px">
                                    <ListItem
                                        modifier='material tappable'
                                        className='list-item--button negative'
                                        onClick={() => {
                                            this.setState({ delete: true })
                                            this.props.deleteParticipant(participant.id);
                                            setTimeout(function () { this.setState({ delete: false }) }.bind(this), 100);
                                        }}
                                    >
                                        <FaTrash className="icon--center" />
                                        {/* <Button modifier="quiet" onClick={this.props.deleteParticipant.bind(this, participant.id)}>Remove</Button> */}
                                    </ListItem>
                                </Col>
                            </Row>
                        )}>
                        {/* <AddParticipant planId={this.props.planId} /> */}
                    </List>
                    :
                    null
                }

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    participants: state.participants.participants,
});

export default connect(mapStateToProps, { getParticipants, deleteParticipant })(Participants)
