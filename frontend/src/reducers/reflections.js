import { GET_REFLECTIONS, GET_REFLECTION, DELETE_REFLECTION, ADD_REFLECTION, UPDATE_REFLECTION } from "../actions/types.js";

const initialState = {
    reflections: [],
    reflection: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_REFLECTIONS:
            return {
                ...state,
                reflections: action.payload.filter(reflection => reflection.participant === action.participant)
            };
        case GET_REFLECTION:
            return {
                ...state,
                reflection: state.reflections.find(reflection => reflection.id === action.payload)
            };
        case DELETE_REFLECTION:
            return {
                ...state,
                reflections: state.reflections.filter(reflection => reflection.id !== action.payload)
            };
        case ADD_REFLECTION:
            return {
                ...state,
                reflections: [...state.reflections, action.payload]
            };
        case UPDATE_REFLECTION:
            return {
                ...state,
                reflections: [...state.reflections.filter(reflection => reflection.id !== action.payload.id), action.payload],
                reflection: action.payload
            };
        default:
            return state;
    }
}