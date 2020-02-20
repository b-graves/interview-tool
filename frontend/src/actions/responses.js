import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_RESPONSES, GET_RESPONSE, DELETE_RESPONSE, ADD_RESPONSE, UPDATE_RESPONSE } from './types';

import { addNote } from './notes'

// GET RESPONSES
export const getResponses = (participantId) => (dispatch, getState) => {
    axios
        .get(`/api/responses/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_RESPONSES,
                payload: res.data,
                participant: participantId
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET RESPONSE
export const getResponse = (id) => (dispatch, getState) => {
    axios
        .get(`/api/responses/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_RESPONSE,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE RESPONSE
export const deleteResponse = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/responses/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_RESPONSE,
                payload: id
            });
        });
}

// ADD RESPONSE
export const addResponse = (response) => (dispatch, getState) => {
    axios
        .post('/api/responses/', response, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_RESPONSE,
                payload: res.data
            });
            
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// UPDATE RESPONSE
export const updateResponse = (response) => (dispatch, getState) => {
    axios
        .put(`/api/responses/${response.id}/`, response, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_RESPONSE,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}