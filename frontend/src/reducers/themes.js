import { GET_THEMES, GET_THEME, DELETE_THEME, ADD_THEME, UPDATE_THEME } from "../actions/types.js";

const initialState = {
    themes: [],
    theme: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_THEMES:
            return {
                ...state,
                themes: action.payload.filter(theme => theme.plan === action.plan)
            };
        case GET_THEME:
            return {
                ...state,
                theme: state.themes.find(theme => theme.id === action.payload)
            };
        case DELETE_THEME:
            return {
                ...state,
                themes: state.themes.filter(theme => theme.id !== action.payload)
            };
        case ADD_THEME:
            return {
                ...state,
                themes: [...state.themes, action.payload]
            };
        case UPDATE_THEME:
            return {
                ...state,
                themes: [...state.themes.filter(theme => theme.id !== action.payload.id), action.payload],
                theme: action.payload
            };
        default:
            return state;
    }
}