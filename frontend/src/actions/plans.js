import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_PLANS, GET_PLAN, DELETE_PLAN, ADD_PLAN, UPDATE_PLAN } from './types';

// GET PLANS
export const getPlans = () => (dispatch, getState) => {
    console.log("Token Config:")
    console.log(tokenConfig(getState));
    axios
        .get('/api/plans/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_PLANS,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET PLAN
export const getPlan = (id) => (dispatch, getState) => {
    console.log("Token Config:")
    console.log(tokenConfig(getState));
    axios
        .get(`/api/plans/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_PLAN,
                payload: id
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE PLAN
export const deletePlan = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/plans/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ genericMessage: "Plan Deleted" }));
            dispatch({
                type: DELETE_PLAN,
                payload: id
            });
        });
}

// ADD PLAN
export const addPlan = (plan) => (dispatch, getState) => {
    axios
        .post('/api/plans/', plan, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ genericMessage: "Plan Created" }));
            dispatch({
                type: ADD_PLAN,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// UPDATE PLAN
export const updatePlan = (plan) => (dispatch, getState) => {
    axios
        .put(`/api/plans/${plan.id}/`, plan, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_PLAN,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}