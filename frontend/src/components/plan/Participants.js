import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParticipants, deleteParticipant } from '../../actions/participants'

import AddParticipant from "./AddParticipant"
import Dashboard from "./Dashboard"

import { Col, Row, List, ListItem, Button, Icon } from 'react-onsenui';

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
                <List
                    dataSource={this.props.participants}
                    renderRow={(participant, idx) => (
                        <ListItem 
                            modifier='material tappable chevron'
                            onClick={() => this.openParticipant(participant.id)}
                        >
                            {participant.name}
                            <Button modifier="quiet" onClick={this.props.deleteParticipant.bind(this, participant.id)}>Remove</Button>
                        </ListItem>
                    )}>
                    <AddParticipant planId={this.props.planId} />
                </List>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    participants: state.participants.participants,
});

export default connect(mapStateToProps, { getParticipants, deleteParticipant })(Participants)
