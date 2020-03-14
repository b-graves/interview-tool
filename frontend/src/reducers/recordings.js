import { GET_RECORDINGS, GET_RECORDING, DELETE_RECORDING, ADD_RECORDING, UPDATE_RECORDING, CLEAR_RECORDINGS } from "../actions/types.js";

const initialState = {
    recordings: [],
    recording: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_RECORDINGS:
            return {
                ...state,
                recordings: action.payload.filter(recording => recording.participant === action.participant)
            };
        case GET_RECORDING:
            return {
                ...state,
                recording: state.recordings.find(recording => recording.id === action.payload)
            };
        case DELETE_RECORDING:
            return {
                ...state,
                recordings: state.recordings.filter(recording => recording.id !== action.payload)
            };
        case ADD_RECORDING:
            return {
                ...state,
                recordings: [...state.recordings, action.payload]
            };
        case UPDATE_RECORDING:
            return {
                ...state,
                recordings: [...state.recordings.filter(recording => recording.id !== action.payload.id), action.payload],
                recording: action.payload
            };
        case CLEAR_RECORDINGS:
                return {
                    ...state,
                    recordings: [],
                };
        default:
            return state;
    }
}