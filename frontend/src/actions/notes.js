import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_NOTES, GET_NOTE, DELETE_NOTE, ADD_NOTE, UPDATE_NOTE } from './types';

// GET NOTES
export const getNotes = (participantId) => (dispatch, getState) => {
    axios
        .get(`/api/notes/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_NOTES,
                payload: res.data,
                participant: participantId
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET NOTE
export const getNote = (id) => (dispatch, getState) => {
    axios
        .get(`/api/notes/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_NOTE,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE NOTE
export const deleteNote = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/notes/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_NOTE,
                payload: id
            });
        });
}

// ADD NOTE
export const addNote = (note) => (dispatch, getState) => {
    axios
        .post('/api/notes/', note, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_NOTE,
                payload: res.data
            });
            
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// UPDATE NOTE
export const updateNote = (note) => (dispatch, getState) => {
    axios
        .put(`/api/notes/${note.id}/`, note, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_NOTE,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}