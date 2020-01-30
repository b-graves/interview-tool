import { GET_PLANS, GET_PLAN, DELETE_PLAN, ADD_PLAN, UPDATE_PLAN } from "../actions/types.js";

const initialState = {
    plans: [],
    plan: null
}

export default function(state = initialState, action) {
    console.log(action.type)
    console.log(state.plans)
    console.log(action.payload)
    switch(action.type) {
        case GET_PLANS:
            return {
                ...state,
                plans: action.payload
            };
        case GET_PLAN:
            return {
                ...state,
                plan: state.plans.find(plan => plan.id === action.payload)
            };
        case DELETE_PLAN:
            return {
                ...state,
                plans: state.plans.filter(plan => plan.id !== action.payload)
            };
        case ADD_PLAN:
            return {
                ...state,
                plans: [...state.plans, action.payload]
            };
        case UPDATE_PLAN:
            return {
                ...state,
                plans: [...state.plans.filter(plan => plan.id !== action.payload.id), action.payload],
                plan: action.payload
            };
        default:
            return state;
    }
}