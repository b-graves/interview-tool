import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_THEMES, GET_THEME, DELETE_THEME, ADD_THEME, UPDATE_THEME } from './types';

// GET THEMES
export const getThemes = (planId) => (dispatch, getState) => {
    axios
        .get(`/api/themes/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_THEMES,
                payload: res.data,
                plan: planId
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET THEME
export const getTheme = (id) => (dispatch, getState) => {
    axios
        .get(`/api/themes/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_THEME,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE THEME
export const deleteTheme = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/themes/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ genericMessage: "Theme Deleted" }));
            dispatch({
                type: DELETE_THEME,
                payload: id
            });
        });
}

// ADD THEME
export const addTheme = (theme) => (dispatch, getState) => {
    axios
        .post('/api/themes/', theme, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ genericMessage: "Theme Added" }));
            dispatch({
                type: ADD_THEME,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// UPDATE THEME
export const updateTheme = (theme) => (dispatch, getState) => {
    axios
        .put(`/api/themes/${theme.id}/`, theme, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_THEME,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}