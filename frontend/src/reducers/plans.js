import { GET_PLANS, DELETE_PLAN, ADD_PLAN } from "../actions/types.js";

const initialState = {
    plans: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PLANS:
            return {
                ...state,
                plans: action.payload
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
        default:
            return state;
    }
}