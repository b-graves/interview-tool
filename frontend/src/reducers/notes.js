import { GET_NOTES, GET_NOTE, DELETE_NOTE, ADD_NOTE, UPDATE_NOTE, GET_NOTES_BY_PARTICIPANT } from "../actions/types.js";

const initialState = {
    notes: {},
    note: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_NOTES:
            return {
                ...state,
                notes: { ...state.notes, [action.response]: action.payload.filter(note => note.response === action.response) }
            };
        case GET_NOTES_BY_PARTICIPANT:
            let notes = {};
            
            action.payload.filter(note => note.participant === action.participant).forEach(note => {
                let response = note.response;
                if (response in notes) {
                    notes[reponse] = [...notes[reponse], note]
                } else {
                    notes[reponse] = [note]
                }
            });
            console.log(notes)
            return {
                ...state,
                notes
            };
        case DELETE_NOTE:
            return {
                ...state,
                notes: { ...state.notes, [action.response]: state.notes[action.response].filter(note => note.id !== action.payload) }
            };
        case ADD_NOTE:
            return {
                ...state,
                notes: { ...state.notes, [action.response]: [...state.notes[action.response], action.payload] }
            };
        case UPDATE_NOTE:
            return {
                ...state,
                notes: { ...state.notes, [action.response]: [...state.notes[action.response].filter(note => note.id !== action.payload.id), action.payload] },
                note: action.payload
            };
        default:
            return state;
    }
}