import { combineReducers } from 'redux';
import plans from "./plans";
import components from "./components";
import errors from "./errors"
import messages from "./messages"
import auth from './auth'

export default combineReducers({
    plans,
    components,
    errors,
    messages,
    auth
});

