import { GET_PARTICIPANTS, GET_PARTICIPANT, DELETE_PARTICIPANT, ADD_PARTICIPANT, UPDATE_PARTICIPANT } from "../actions/types.js";

const initialState = {
    participants: [],
    participant: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PARTICIPANTS:
            return {
                ...state,
                participants: action.payload.filter(participant => participant.plan === action.plan)
            };
        case GET_PARTICIPANT:
            return {
                ...state,
                participant: state.participants.find(participant => participant.id === action.payload)
            };
        case DELETE_PARTICIPANT:
            return {
                ...state,
                participants: state.participants.filter(participant => participant.id !== action.payload)
            };
        case ADD_PARTICIPANT:
            return {
                ...state,
                participants: [...state.participants, action.payload]
            };
        case UPDATE_PARTICIPANT:
            return {
                ...state,
                participants: [...state.participants.filter(participant => participant.id !== action.payload.id), action.payload],
                participant: action.payload
            };
        default:
            return state;
    }
}