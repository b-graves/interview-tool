import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Editor as DraftEditor } from '@tinymce/tinymce-react';

import { Button } from 'react-onsenui';

import ReactPlayer from 'react-player'

import { getRecordings } from '../../actions/recordings';

export class Player extends Component {

    componentDidMount() {
        this.props.getRecordings(this.props.participant.id);
    }

    render() {
        console.log(this.props.recordings)
        return (

            <div>
                {this.props.recordings.length > 0 ?
                    <ReactPlayer url={this.props.recordings[0].blobURL} playing controls loop /> 
                : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    recordings: state.recordings.recordings,
});

export default connect(mapStateToProps, { getRecordings })(Player)
