import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getNotes, addNote, updateNote, deleteNote } from '../../actions/notes';

import { Col, Row, List, ListItem, Button, Input } from 'react-onsenui';

import { FaCircle } from 'react-icons/fa';

import { MdFormatIndentIncrease, MdFormatIndentDecrease } from 'react-icons/md';

export class Bullet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.note.text,
        };
        this.node = null;
    }

    componentDidMount() {
        if (this.node) {
            console.log(this.state.value)
            console.log(this.props.note)
            this.node.innerText = this.state.value;
        }
    }

    render() {
        let note = this.props.note;
        let index = this.props.index;
        return (
            <div
                contentEditable="true"
                class="textarea textarea--transparent note-input"
                name="note"
                placeholder="Start Typing here..."
                onKeyDown={event => {
                    if (event.keyCode == 13) {
                        event.preventDefault();
                        this.props.onEnter(note, index);
                    }
                }}
                ref={node => this.node = node}
                onFocus={() => {
                    this.props.setListState({ currentNote: note.id, focus: null })
                }}
                onBlur={event => {
                    let noteValue = event.target.textContent
                    this.props.setListState({ noteValue });
                    if (noteValue !== null) {
                        if (noteValue === "" && index > 0) {
                            this.props.deleteNote(note.id);
                        } else {
                            this.props.updateNote({ ...note, text: noteValue });
                        }
                    }
                }}
                id={this.props.response.id.toString() + "-" + index}
            >
            </div>
        );
    }
}

export default connect(null, { getNotes, addNote, updateNote, deleteNote })(Bullet)