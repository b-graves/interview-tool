import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_PARTICIPANTS, GET_PARTICIPANT, DELETE_PARTICIPANT, ADD_PARTICIPANT } from './types';

// GET PARTICIPANTS
export const getParticipants = (planId) => (dispatch, getState) => {
    axios
        .get(`/api/participants/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_PARTICIPANTS,
                payload: res.data,
                plan: planId
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET PARTICIPANT
export const getParticipant = (id) => (dispatch, getState) => {
    axios
        .get(`/api/participants/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_PARTICIPANT,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE PARTICIPANT
export const deleteParticipant = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/participants/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ genericMessage: "Session Deleted" }));
            dispatch({
                type: DELETE_PARTICIPANT,
                payload: id
            });
        });
}

// ADD PARTICIPANT
export const addParticipant = (participant) => (dispatch, getState) => {
    axios
        .post('/api/participants/', participant, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ genericMessage: "Session Added" }));
            dispatch({
                type: ADD_PARTICIPANT,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}