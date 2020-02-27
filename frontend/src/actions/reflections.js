import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_REFLECTIONS, GET_REFLECTION, DELETE_REFLECTION, ADD_REFLECTION, UPDATE_REFLECTION } from './types';

import { addNote } from './notes'

// GET REFLECTIONS
export const getReflections = (participantId) => (dispatch, getState) => {
    axios
        .get(`/api/reflections/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REFLECTIONS,
                payload: res.data,
                participant: participantId
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET REFLECTION
export const getReflection = (id) => (dispatch, getState) => {
    axios
        .get(`/api/reflections/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REFLECTION,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE REFLECTION
export const deleteReflection = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/reflections/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_REFLECTION,
                payload: id
            });
        });
}

// ADD REFLECTION
export const addReflection = (reflection) => (dispatch, getState) => {
    axios
        .post('/api/reflections/', reflection, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_REFLECTION,
                payload: res.data
            });
            
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// UPDATE REFLECTION
export const updateReflection = (reflection) => (dispatch, getState) => {
    axios
        .put(`/api/reflections/${reflection.id}/`, reflection, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_REFLECTION,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}