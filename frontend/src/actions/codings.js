import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_CODINGS, GET_CODING, DELETE_CODING, ADD_CODING, UPDATE_CODING } from './types';

// GET CODINGS
export const getCodings = () => (dispatch, getState) => {
    axios
        .get(`/api/codings/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CODINGS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET CODING
export const getCoding = (id) => (dispatch, getState) => {
    axios
        .get(`/api/codings/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CODING,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE CODING
export const deleteCoding = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/codings/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_CODING,
                payload: id
            });
        });
}

// ADD CODING
export const addCoding = (coding) => (dispatch, getState) => {
    axios
        .post('/api/codings/', coding, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_CODING,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// UPDATE CODING
export const updateCoding = (coding) => (dispatch, getState) => {
    axios
        .put(`/api/codings/${coding.id}/`, coding, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_CODING,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}