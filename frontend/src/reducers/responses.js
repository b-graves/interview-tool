import { GET_RESPONSES, GET_RESPONSE, DELETE_RESPONSE, ADD_RESPONSE, UPDATE_RESPONSE, CLEAR_RESPONSES } from "../actions/types.js";

const initialState = {
    responses: [],
    response: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_RESPONSES:
            return {
                ...state,
                responses: action.payload.filter(response => response.participant === action.participant)
            };
        case GET_RESPONSE:
            return {
                ...state,
                response: state.responses.find(response => response.id === action.payload)
            };
        case DELETE_RESPONSE:
            return {
                ...state,
                responses: state.responses.filter(response => response.id !== action.payload)
            };
        case ADD_RESPONSE:
            return {
                ...state,
                responses: [...state.responses, action.payload],
                notes: {...state.notes, [action.payload.id]: []}
            };
        case UPDATE_RESPONSE:
            return {
                ...state,
                responses: [...state.responses.filter(response => response.id !== action.payload.id), action.payload],
                response: action.payload
            };
        case CLEAR_RESPONSES:
                return {
                    ...state,
                    responses: [],
                };
        default:
            return state;
    }
}