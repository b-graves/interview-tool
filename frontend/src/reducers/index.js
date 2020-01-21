import { combineReducers } from 'redux';
import plans from "./plans";
import errors from "./errors"
import messages from "./messages"
import auth from './auth'

export default combineReducers({
    plans,
    errors,
    messages,
    auth
});

