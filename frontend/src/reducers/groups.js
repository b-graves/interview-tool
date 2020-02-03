import { GET_GROUPS, GET_GROUP, DELETE_GROUP, ADD_GROUP, UPDATE_GROUP } from "../actions/types.js";

const initialState = {
    groups: [],
    group: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: action.payload.filter(group => group.plan === action.plan)
            };
        case GET_GROUP:
            return {
                ...state,
                group: state.groups.find(group => group.id === action.payload)
            };
        case DELETE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group.id !== action.payload)
            };
        case ADD_GROUP:
            return {
                ...state,
                groups: [...state.groups, action.payload]
            };
        case UPDATE_GROUP:
            return {
                ...state,
                groups: [...state.groups.filter(group => group.id !== action.payload.id), action.payload],
                group: action.payload
            };
        default:
            return state;
    }
}