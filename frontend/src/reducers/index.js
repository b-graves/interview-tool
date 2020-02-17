import { combineReducers } from 'redux';
import plans from "./plans";
import components from "./components";
import responses from "./responses";
import recordings from "./recordings";
import groups from "./groups";
import participants from "./participants";
import errors from "./errors"
import messages from "./messages"
import auth from './auth'

export default combineReducers({
    plans,
    components,
    responses,
    recordings,
    groups,
    participants,
    errors,
    messages,
    auth
});

