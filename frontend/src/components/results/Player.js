import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Editor as DraftEditor } from '@tinymce/tinymce-react';

import { Button } from 'react-onsenui';

import ReactPlayer from 'react-player'
import FilePlayer from 'react-player/lib/players/FilePlayer'

import { getRecordings } from '../../actions/recordings';

export class Player extends Component {

    render() {
        console.log(this.props.recordings)
        return (
            <div>
                Player: {this.props.recording.blobURL}
                <ReactPlayer url={this.props.recording.blobURL} playing controls />
                {playing ?
                    <IoMdPause onClick={this.handlePlayPause} />
                    : 
                    <IoMdPlay onClick={this.handlePlayPause} />
                }
            </div>
        )
    }
}

export default connect(null,{ })(Player)
