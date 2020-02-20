import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getNotes, addNote, updateNote, deleteNote } from '../../actions/notes';

import { Col, Row, List, ListItem, Button, Input, Icon } from 'react-onsenui';

export class BulletEditor extends Component {

    componentDidMount() {
        this.props.getNotes(this.props.response.id);
        this.props.addNote({ response: this.props.response.id, moment: this.props.getTime(), level: 0})
    }

    state = {
        added: false
    }

    render() {

        return (
            <div>
                {this.props.notes.map(note =>
                    <form>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Start Typing here..."
                            onChange={e => {this.props.updateNote({ ...note, text: e.target.value})}}
                            value={note.text}
                        />
                    </form>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    notes: state.notes.notes[ownProps.response.id] == undefined ? [] : state.notes.notes[ownProps.response.id],
});


export default connect(mapStateToProps, { getNotes, addNote, updateNote, deleteNote })(BulletEditor)
