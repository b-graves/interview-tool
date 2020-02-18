import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import ReactPlayer from 'react-player'

import { IoMdPlay, IoMdPause } from "react-icons/io";

export class Players extends Component {

    state = {
        ready: false,
        playing: false,
        recording: this.getRecording()
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleProgress = state => {
        console.log('onProgress', state)
        this.props.setProgress(this.state.recordingStart + state.playedSeconds)
    }

    getRecording() {
        return this.props.recordings.find(recording => recording.start <= this.props.moment && recording.stop >= this.props.moment)
    }

    handleSeek = moment => {
        console.log("seek")
        console.log(moment)
        let recording = this.getRecording()
        this.setState(recording)
        if (recording) {
            let seconds = moment - recording.start;
            this.player.seekTo(parseFloat(seconds));
        }
        
    }

    handleOnReady = () => {
        this.setState({ready: true});
    }

    ref = player => {
        this.player = player
    }

    render() {
        const { playing, ready, recording } = this.state

        // recording = this.props.recordings.find(recording => recording.start <= this.props.moment && recording.stop >= this.props.moment)

        return (
            <div>
                {recording ?
                    <ReactPlayer
                        ref={this.ref}
                        url={recording.audio}
                        playing={playing}
                        controls={false}
                        light={false}
                        loop={false}
                        onReady={() => console.log('onReady')}
                        onStart={() => console.log('onStart')}
                        onBuffer={() => console.log('onBuffer')}
                        onSeek={e => console.log('onSeek', e)}
                        onError={e => console.log('onError', e)}
                        onProgress={this.handleProgress}
                    />
                    :
                    null
                }
                <div style={{ opacity: recording ? 1 : 0.4 }}>
                    {playing ?
                        <IoMdPause onClick={this.handlePlayPause} />
                        :
                        <IoMdPlay onClick={this.handlePlayPause} />
                    }
                </div>
            </div>
        )
    }
}

export default connect(null, {})(Players)
