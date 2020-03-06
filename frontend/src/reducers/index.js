import { combineReducers } from 'redux';
import plans from "./plans";
import components from "./components";
import notes from "./notes";
import responses from "./responses";
import declarations from "./declarations";
import reflections from "./reflections";
import recordings from "./recordings";
import groups from "./groups";
import participants from "./participants";
import themes from "./themes";
import codings from "./codings";
import codingTypes from "./codingtypes";
import errors from "./errors"
import messages from "./messages"
import auth from './auth'

export default combineReducers({
    plans,
    components,
    responses,
    recordings,
    declarations,
    reflections,
    groups,
    participants,
    errors,
    messages,
    auth,
    themes,
    codings,
    codingTypes,
    notes
});

