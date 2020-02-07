import { combineReducers } from 'redux';
import plans from "./plans";
import components from "./components";
import responses from "./responses";
import groups from "./groups";
import participants from "./participants";
import errors from "./errors"
import messages from "./messages"
import auth from './auth'

export default combineReducers({
    plans,
    components,
    responses,
    groups,
    participants,
    errors,
    messages,
    auth,
    responses
});

