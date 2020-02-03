import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_GROUPS, GET_GROUP, DELETE_GROUP, ADD_GROUP, UPDATE_GROUP } from './types';

// GET GROUPS
export const getGroups = (planId) => (dispatch, getState) => {
    axios
        .get(`/api/groups/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_GROUPS,
                payload: res.data,
                plan: planId
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET GROUP
export const getGroup = (id) => (dispatch, getState) => {
    axios
        .get(`/api/groups/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_GROUP,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE GROUP
export const deleteGroup = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/groups/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ genericMessage: "Group Deleted" }));
            dispatch({
                type: DELETE_GROUP,
                payload: id
            });
        });
}

// ADD GROUP
export const addGroup = (group) => (dispatch, getState) => {
    axios
        .post('/api/groups/', group, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ genericMessage: "Group Added" }));
            dispatch({
                type: ADD_GROUP,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// UPDATE GROUP
export const updateGroup = (group) => (dispatch, getState) => {
    axios
        .put(`/api/groups/${group.id}/`, group, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_GROUP,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}