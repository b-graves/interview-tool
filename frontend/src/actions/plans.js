import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_PLANS, DELETE_PLAN, ADD_PLAN } from './types';

// GET PLANS
export const getPlans = () => (dispatch, getState) => {
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

// DELETE PLAN
export const deletePlan = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/plans/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deletePlan: "Plan Deleted" }));
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
            dispatch(createMessage({ addPlan: "Plan Added" }));
            dispatch({
                type: ADD_PLAN,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}