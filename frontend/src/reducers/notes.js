import { GET_NOTES, GET_NOTE, DELETE_NOTE, ADD_NOTE, UPDATE_NOTE, CLEAR_NOTES } from "../actions/types.js";

const initialState = {
    notes: [],
    note: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_NOTES:
            return {
                ...state,
                notes: action.payload.filter(note => note.participant === action.participant)
            };
        case GET_NOTE:
            return {
                ...state,
                note: state.notes.find(note => note.id === action.payload)
            };
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            };
        case ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload],
            };
        case UPDATE_NOTE:
            return {
                ...state,
                notes: [...state.notes.filter(note => note.id !== action.payload.id), action.payload],
                note: action.payload
            };
        default:
            return state;
    }
}