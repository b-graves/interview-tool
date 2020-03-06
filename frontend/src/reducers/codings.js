import { GET_CODINGS, GET_CODING, DELETE_CODING, ADD_CODING, UPDATE_CODING } from "../actions/types.js";

const initialState = {
    codings: [],
    coding: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CODINGS:
            return {
                ...state,
                codings: action.payload
            };
        case GET_CODING:
            return {
                ...state,
                coding: state.codings.find(coding => coding.id === action.payload)
            };
        case DELETE_CODING:
            return {
                ...state,
                codings: state.codings.filter(coding => coding.id !== action.payload)
            };
        case ADD_CODING:
            return {
                ...state,
                codings: [...state.codings, action.payload]
            };
        case UPDATE_CODING:
            return {
                ...state,
                codings: [...state.codings.filter(coding => coding.id !== action.payload.id), action.payload],
                coding: action.payload
            };
        default:
            return state;
    }
}