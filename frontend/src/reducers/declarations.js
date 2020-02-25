import { GET_DECLARATIONS, GET_DECLARATION, DELETE_DECLARATION, ADD_DECLARATION, UPDATE_DECLARATION } from "../actions/types.js";

const initialState = {
    declarations: [],
    declaration: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_DECLARATIONS:
            return {
                ...state,
                declarations: action.payload.filter(declaration => declaration.participant === action.participant)
            };
        case GET_DECLARATION:
            return {
                ...state,
                declaration: state.declarations.find(declaration => declaration.id === action.payload)
            };
        case DELETE_DECLARATION:
            return {
                ...state,
                declarations: state.declarations.filter(declaration => declaration.id !== action.payload)
            };
        case ADD_DECLARATION:
            return {
                ...state,
                declarations: [...state.declarations, action.payload]
            };
        case UPDATE_DECLARATION:
            return {
                ...state,
                declarations: [...state.declarations.filter(declaration => declaration.id !== action.payload.id), action.payload],
                declaration: action.payload
            };
        default:
            return state;
    }
}