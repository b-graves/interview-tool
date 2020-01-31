import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_COMPONENTS, GET_COMPONENT, DELETE_COMPONENT, ADD_COMPONENT, UPDATE_COMPONENT } from './types';

// GET COMPONENTS
export const getComponents = (planId) => (dispatch, getState) => {
    axios
        .get(`/api/components/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_COMPONENTS,
                payload: res.data,
                plan: planId
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET COMPONENT
export const getComponent = (id) => (dispatch, getState) => {
    axios
        .get(`/api/components/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_COMPONENT,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE COMPONENT
export const deleteComponent = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/components/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ genericMessage: "Component Deleted" }));
            dispatch({
                type: DELETE_COMPONENT,
                payload: id
            });
        });
}

// ADD COMPONENT
export const addComponent = (component) => (dispatch, getState) => {
    axios
        .post('/api/components/', component, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ genericMessage: "Component Added" }));
            dispatch({
                type: ADD_COMPONENT,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// UPDATE COMPONENT
export const updateComponent = (component) => (dispatch, getState) => {
    axios
        .put(`/api/components/${component.id}/`, component, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_COMPONENT,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}