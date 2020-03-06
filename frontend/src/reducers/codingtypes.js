import { GET_CODING_TYPES, GET_CODING_TYPE, DELETE_CODING_TYPE, ADD_CODING_TYPE, UPDATE_CODING_TYPE } from "../actions/types.js";

const initialState = {
    codingTypes: [],
    codingType: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CODING_TYPES:
            return {
                ...state,
                codingTypes: action.payload.filter(codingType => codingType.plan === action.plan)
            };
        case GET_CODING_TYPE:
            return {
                ...state,
                codingType: state.codingTypes.find(codingType => codingType.id === action.payload)
            };
        case DELETE_CODING_TYPE:
            return {
                ...state,
                codingTypes: state.codingTypes.filter(codingType => codingType.id !== action.payload)
            };
        case ADD_CODING_TYPE:
            return {
                ...state,
                codingTypes: [...state.codingTypes, action.payload]
            };
        case UPDATE_CODING_TYPE:
            return {
                ...state,
                codingTypes: [...state.codingTypes.filter(codingType => codingType.id !== action.payload.id), action.payload],
                codingType: action.payload
            };
        default:
            return state;
    }
}