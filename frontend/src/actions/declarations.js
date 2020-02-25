import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_DECLARATIONS, GET_DECLARATION, DELETE_DECLARATION, ADD_DECLARATION, UPDATE_DECLARATION } from './types';

import { addNote } from './notes'

// GET DECLARATIONS
export const getDeclarations = (participantId) => (dispatch, getState) => {
    axios
        .get(`/api/declarations/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_DECLARATIONS,
                payload: res.data,
                participant: participantId
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET DECLARATION
export const getDeclaration = (id) => (dispatch, getState) => {
    axios
        .get(`/api/declarations/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_DECLARATION,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE DECLARATION
export const deleteDeclaration = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/declarations/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_DECLARATION,
                payload: id
            });
        });
}

// ADD DECLARATION
export const addDeclaration = (declaration) => (dispatch, getState) => {
    axios
        .post('/api/declarations/', declaration, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_DECLARATION,
                payload: res.data
            });
            
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// UPDATE DECLARATION
export const updateDeclaration = (declaration) => (dispatch, getState) => {
    axios
        .put(`/api/declarations/${declaration.id}/`, declaration, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_DECLARATION,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}