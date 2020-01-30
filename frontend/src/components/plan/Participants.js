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

import Session from '../session/Session'

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

    startSession(participantId, planId) {
        this.props.navigator.pushPage({ component: Session, props: { participantId, planId, duration: 100 } });
    }

    state = {
        delete: false
    }

    render() {
        return (
            <Fragment>
                {this.props.participants.length > 0 && !this.state.delete ?
                    
                    <Row>
                        <Col>
                            <List
                                // renderHeader={() =>
                                //     <ListHeader style={{fontSize: 15}} className="testClass"><MdPerson className="header-icon--larger"/> Participant </ListHeader> }
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
                        {/* <Col width="156px">
                            <List
                                renderHeader={() =>
                                    <ListHeader style={{fontSize: 15, textAlign: "center"}} className="testClass"><FaBalanceScale className="header-icon--larger"/> Bias Declaration </ListHeader> }
                                dataSource={this.props.participants}
                                renderRow={(participant, idx) => (
                                    <ListItem 
                                        style={{alignItems: "center"}}
                                        modifier='material tappable'
                                        // onClick={this.props.deleteParticipant.bind(this, participant.id)}
                                    >
                                        {Math.random() > 0.5 ? <FaCheck className="icon--center" style={{color: "green"}} /> : <FaEllipsisH className="icon--center" />}
                                        <FaEllipsisH className="icon--center" />
                                    </ListItem>
                                )}>
                            </List>
                        </Col> */}
                        <Col width="156px">
                            <List
                                // renderHeader={() =>
                                //     <ListHeader style={{fontSize: 15, textAlign:"center"}} className="testClass"><GiDiscussion className="header-icon--larger"/> Session</ListHeader> }
                                dataSource={this.props.participants}
                                renderRow={(participant, idx) => (
                                    <ListItem 
                                        style={{textAlign: "center", alignItems: "flex-start"}}
                                        modifier='material tappable'
                                        className='list-item--button positive'
                                        onClick={() => this.startSession(participant.id, this.props.planId)}
                                    >
                                        {/* {Math.random() > 0.5 ? <FaCheck className="icon--center" style={{color: "green"}} /> : <FaEllipsisH className="icon--center" />} */}
                                        <div style={{textAlign: "center", alignItems: "flex-start", width: "100%"}}>
                                            <FaPlay 
                                                className="button-icon"
                                            /> Start Session
                                        </div>
                                        {/* <Button modifier="quiet" onClick={this.props.deleteParticipant.bind(this, participant.id)}>Remove</Button> */}
                                    </ListItem>
                                )}>
                            </List>
                        </Col>
                        {/* <Col width="156px">
                            <List
                                renderHeader={() =>
                                    <ListHeader style={{fontSize: 15, textAlign:"center"}} className="testClass"><FaBalanceScale className="header-icon--larger"/> Bias Reflection</ListHeader> }
                                dataSource={this.props.participants}
                                renderRow={(participant, idx) => (
                                    <ListItem 
                                        style={{textAlign: "center", "background-color": "#f0eff4"}}
                                        modifier='material'
                                        // onClick={this.props.deleteParticipant.bind(this, participant.id)}
                                    >
                                        {Math.random() > 0.5 ? <FaCheck className="icon--center" style={{color: "green"}} /> : <FaEllipsisH className="icon--center" />}
                                        <FaEllipsisH style={{color: "lightgrey"}} className="icon--center" />
                                    </ListItem>
                                )}>
                            </List>
                        </Col> */}
                        <Col width="48px">
                            <List
                                // renderHeader={() =>
                                //     <ListHeader style={{fontSize: 15, textAlign:"center"}} className="testClass"><FaBalanceScale className="header-icon--larger hidden"/></ListHeader> }
                                dataSource={this.props.participants}
                                renderRow={(participant, idx) => (
                                    <ListItem 
                                        modifier='material tappable'
                                        className='list-item--button negative'
                                        onClick={()=>{
                                            this.setState({delete: true})
                                            this.props.deleteParticipant(participant.id);
                                            setTimeout(function(){this.setState({delete: false})}.bind(this), 100);
                                        }}
                                    >
                                        <FaTrash className="icon--center"/>
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
