import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParticipants, deleteParticipant } from '../../actions/participants'

import AddParticipant from "./AddParticipant"
import Dashboard from "./Dashboard"

import { Col, Row, List, ListItem, Button, Icon, ListHeader } from 'react-onsenui';

import { FaChevronUp, FaChevronDown, FaTrash, FaPen, FaBalanceScale, FaCheck, FaEllipsisH } from 'react-icons/fa';
import { GiDiscussion } from 'react-icons/gi';
import { MdPerson } from 'react-icons/md';

export class Participants extends Component {
    static propTypes = {
        participants: PropTypes.array.isRequired,
        getParticipants: PropTypes.func.isRequired,
        deleteParticipant: PropTypes.func.isRequired,
    }

    participantDidMount() {
        this.props.getParticipants(this.props.planId);
    }

    openParticipant(participantId) {
        console.log(participantId)
    }

    render() {
        return (
            <Fragment>
                {this.props.participants.length > 0 ?
                    <Row>
                        <Col>
                            <List
                                renderHeader={() =>
                                    <ListHeader style={{fontSize: 15}} className="testClass"><MdPerson className="header-icon--larger"/> Participant </ListHeader> }
                                dataSource={this.props.participants}
                                renderRow={(participant, idx) => (
                                    <ListItem 
                                        modifier='material tappable'
                                        onClick={() => this.openParticipant(participant.id)}
                                    >
                                        {participant.name}
                                        {/* <Button modifier="quiet" onClick={this.props.deleteParticipant.bind(this, participant.id)}>Remove</Button> */}
                                    </ListItem>
                                )}>
                                    {/* <AddParticipant planId={this.props.planId} /> */}
                            </List>
                        </Col>
                        {/* <Col width="48px">
                            <List
                                dataSource={this.props.participants}
                                renderRow={(participant, idx) => (
                                    <ListItem 
                                        modifier='material tappable'
                                        onClick={() => this.openParticipant(participant.id)}
                                    >
                                        <FaPen />
                                    </ListItem>
                                )}>
                            </List>
                        </Col> */}
                        <Col width="156px">
                            <List
                                renderHeader={() =>
                                    <ListHeader style={{fontSize: 15, textAlign: "center"}} className="testClass"><FaBalanceScale className="header-icon--larger"/> Bias Declaration </ListHeader> }
                                dataSource={this.props.participants}
                                renderRow={(participant, idx) => (
                                    <ListItem 
                                        style={{alignItems: "center"}}
                                        modifier='material tappable'
                                        onClick={this.props.deleteParticipant.bind(this, participant.id)}
                                    >
                                        {Math.random() > 0.5 ? <FaCheck className="icon--center" style={{color: "green"}} /> : <FaEllipsisH className="icon--center" />}
                                        {/* <Button modifier="quiet" onClick={this.props.deleteParticipant.bind(this, participant.id)}>Remove</Button> */}
                                    </ListItem>
                                )}>
                            </List>
                        </Col>
                        <Col width="156px">
                            <List
                                renderHeader={() =>
                                    <ListHeader style={{fontSize: 15, textAlign:"center"}} className="testClass"><GiDiscussion className="header-icon--larger"/> Session</ListHeader> }
                                dataSource={this.props.participants}
                                renderRow={(participant, idx) => (
                                    <ListItem 
                                        style={{alignItems: "center"}}
                                        modifier='material tappable'
                                        onClick={this.props.deleteParticipant.bind(this, participant.id)}
                                    >
                                        {Math.random() > 0.5 ? <FaCheck className="icon--center" style={{color: "green"}} /> : <FaEllipsisH className="icon--center" />}
                                        {/* <Button modifier="quiet" onClick={this.props.deleteParticipant.bind(this, participant.id)}>Remove</Button> */}
                                    </ListItem>
                                )}>
                            </List>
                        </Col>
                        <Col width="156px">
                            <List
                                renderHeader={() =>
                                    <ListHeader style={{fontSize: 15, textAlign:"center"}} className="testClass"><FaBalanceScale className="header-icon--larger"/> Bias Reflection</ListHeader> }
                                dataSource={this.props.participants}
                                renderRow={(participant, idx) => (
                                    <ListItem 
                                        style={{textAlign: "center"}}
                                        modifier='material tappable'
                                        onClick={this.props.deleteParticipant.bind(this, participant.id)}
                                    >
                                        {Math.random() > 0.5 ? <FaCheck className="icon--center" style={{color: "green"}} /> : <FaEllipsisH className="icon--center" />}
                                        {/* <Button modifier="quiet" onClick={this.props.deleteParticipant.bind(this, participant.id)}>Remove</Button> */}
                                    </ListItem>
                                )}>
                            </List>
                        </Col>
                        <Col width="48px">
                            <List
                                renderHeader={() =>
                                    <ListHeader style={{fontSize: 15, textAlign:"center"}} className="testClass"><FaBalanceScale className="header-icon--larger hidden"/></ListHeader> }
                                dataSource={this.props.participants}
                                renderRow={(participant, idx) => (
                                    <ListItem 
                                        modifier='material tappable'
                                        onClick={this.props.deleteParticipant.bind(this, participant.id)}
                                    >
                                        <FaTrash />
                                        {/* <Button modifier="quiet" onClick={this.props.deleteParticipant.bind(this, participant.id)}>Remove</Button> */}
                                    </ListItem>
                                )}>
                            </List>
                        </Col>
                    </Row>
                :
                    null
                }
                <AddParticipant planId={this.props.planId} />

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    participants: state.participants.participants,
});

export default connect(mapStateToProps, { getParticipants, deleteParticipant })(Participants)
