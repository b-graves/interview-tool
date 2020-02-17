import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_RECORDINGS, GET_RECORDING, DELETE_RECORDING, ADD_RECORDING, UPDATE_RECORDING } from './types';

// GET RECORDINGS
export const getRecordings = (participantId) => (dispatch, getState) => {
    axios
        .get(`/api/recordings/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_RECORDINGS,
                payload: res.data,
                participant: participantId
            });
        })
        .catch(err => dispatch(returnErrors(err.recording.data, err.recording.status)));
}

// GET RECORDING
export const getRecording = (id) => (dispatch, getState) => {
    axios
        .get(`/api/recordings/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_RECORDING,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.recording.data, err.recording.status)));
}

// DELETE RECORDING
export const deleteRecording = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/recordings/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_RECORDING,
                payload: id
            });
        });
}

// ADD RECORDING
export const addRecording = (recording) => (dispatch, getState) => {
    axios
        .post('/api/recordings/', recording, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_RECORDING,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.recording.data, err.recording.status)));
}

// UPDATE RECORDING
export const updateRecording = (recording) => (dispatch, getState) => {
    axios
        .put(`/api/recordings/${recording.id}/`, recording, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_RECORDING,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.recording.data, err.recording.status)));
}