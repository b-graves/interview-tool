import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_CODING_TYPES, GET_CODING_TYPE, DELETE_CODING_TYPE, ADD_CODING_TYPE, UPDATE_CODING_TYPE } from './types';

// GET CODING_TYPES
export const getCodingTypes = (planId) => (dispatch, getState) => {
    axios
        .get(`/api/codingtypes/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CODING_TYPES,
                payload: res.data,
                plan: planId
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET CODING_TYPE
export const getCodingType = (id) => (dispatch, getState) => {
    axios
        .get(`/api/codingtypes/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CODING_TYPE,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE CODING_TYPE
export const deleteCodingType = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/codingtypes/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_CODING_TYPE,
                payload: id
            });
        });
}

// ADD CODING_TYPE
export const addCodingType = (codingtype) => (dispatch, getState) => {
    axios
        .post('/api/codingtypes/', codingtype, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_CODING_TYPE,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// UPDATE CODING_TYPE
export const updateCodingType = (codingtype) => (dispatch, getState) => {
    axios
        .put(`/api/codingtypes/${codingtype.id}/`, codingtype, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_CODING_TYPE,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}