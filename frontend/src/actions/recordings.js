import { createMessage, returnErrors } from './messages';

// ADD PARTICIPANT
export const addRecording = (recording) => (dispatch, getState) => {
    dispatch(createMessage({ genericMessage: "Add Recording from "+recording.start+" to "+recording.stop }));
    console.log(recording)
    window.open(recording.recordedBlob.blobURL, '_blank');
}