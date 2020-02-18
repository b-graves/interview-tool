import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Editor as DraftEditor } from '@tinymce/tinymce-react';

import { Button } from 'react-onsenui';

import { ReactMic } from 'react-mic';

import { addRecording } from '../../actions/recordings';

export class Recorder extends Component {

    onData() {
        console.log('This function does not return an object, but is called at a time interval of 10ms');
    }

    onStop(recordedBlob) {
        this.props.addRecording({
            participant: this.props.participant,
            start: this.props.startTime,
            stop: this.props.time,
            blobURL: recordedBlob.blobURL,
            audio: recordedBlob.blob
        })
    }

    
    render() {
        return (
            <div style={{overflow: "hidden"}}>
                <ReactMic
                    record={this.props.recording}
                    className={"sound-wave"}
                    onStop={this.onStop.bind(this)}
                    onData={this.onData.bind(this)}
                    strokeColor="#000000"
                    backgroundColor="white"
                    mimeType="audio/mp3"
                />
            </div>
        )
    }
}


export default connect(null, {addRecording})(Recorder)
