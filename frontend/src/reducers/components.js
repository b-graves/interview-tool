import { GET_COMPONENTS, GET_COMPONENT, DELETE_COMPONENT, ADD_COMPONENT, UPDATE_COMPONENT } from "../actions/types.js";

const initialState = {
    components: [],
    component: null
}

export default function(state = initialState, action) {
    if (action.type == GET_COMPONENTS) {
        console.log(GET_COMPONENTS)
        console.log(action)
    }
    switch(action.type) {
        case GET_COMPONENTS:
            return {
                ...state,
                components: action.payload.filter(component => component.plan === action.plan)
            };
        case GET_COMPONENT:
            return {
                ...state,
                component: state.components.find(component => component.id === action.payload)
            };
        case DELETE_COMPONENT:
            return {
                ...state,
                components: state.components.filter(component => component.id !== action.payload)
            };
        case ADD_COMPONENT:
            return {
                ...state,
                components: [...state.components, action.payload]
            };
        case UPDATE_COMPONENT:
            return {
                ...state,
                components: [...state.components.filter(component => component.id !== action.payload.id), action.payload],
                component: action.payload
            };
        default:
            return state;
    }
}