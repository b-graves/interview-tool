import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getNotes, addNote, updateNote, deleteNote } from '../../actions/notes';

import { Col, Row, List, ListItem, Button, Input } from 'react-onsenui';

import { FaCircle } from 'react-icons/fa';

import { MdFormatIndentIncrease, MdFormatIndentDecrease } from 'react-icons/md';

export class BulletEditor extends Component {

    componentDidMount() {
        this.props.addNote({ response: this.props.response.id, moment: this.props.getTime(), level: 0, order: 0, participant: this.props.response.participant });
        // this.props.getNotes(this.props.response.id);
        this.setState({ focus: this.props.response.id.toString() + "-0" })
    }

    focusDiv() {
        ReactDOM.findDOMNode(this.refs.theDiv).focus();
    }

    state = {
        level: 0,
        currentNote: null,
        noteValue: null,
        focus: null
    }

    onSubmit = (e, note, index) => {
        e.preventDefault();
        let order = note.order;
        if (index === this.props.notes.length - 1) {
            order += 100
        } else {
            order = (order + this.props.notes[index + 1].order) / 2
        }
        this.props.addNote({ response: this.props.response.id, moment: this.props.getTime(), level: note.level, order, participant: this.props.response.participant  });
        this.setState({ focus: this.props.response.id.toString() + "-" + (index + 1) })
    }

    onEnter = (note, index) => {
        let order = note.order;
        if (index === this.props.notes.length - 1) {
            order += 100
        } else {
            order = (order + this.props.notes[index + 1].order) / 2
        }
        this.props.addNote({ response: this.props.response.id, moment: this.props.getTime(), level: note.level, order, participant: this.props.response.participant  });
        this.setState({ focus: this.props.response.id.toString() + "-" + (index + 1) })
    }

    componentDidUpdate() {
        if (this.state.focus !== null) {
            let inputElement = document.getElementById(this.state.focus)
            if (inputElement !== null) {
                document.activeElement.blur();
                inputElement.focus();
            }
        }
    }

    render() {
        this.props.notes.sort(function (a, b) {
            return a.order - b.order;
        })

        return (
            <div style={{ padding: "10px" }}>
                {this.props.notes.map((note, index) =>
                    <form onSubmit={e => this.onSubmit(e, note, index)}>
                        <Row>
                            <Col width={20 * note.level + 30} style={{paddingLeft: 20 * note.level}}>
                                <FaCircle className="bullet-point" />
                            </Col>
                            <Col>
                                <div 
                                    contentEditable="true"
                                    class="textarea textarea--transparent note-input"
                                    name="note"
                                    placeholder="Start Typing here..."
                                    onKeyDown={ event => {
                                        if (event.keyCode == 13) {
                                            event.preventDefault();
                                            this.onEnter(note, index);
                                        }
                                    }}
                                    onFocus={() => {
                                        this.setState({ currentNote: note.id, focus: null })
                                    }}
                                    onBlur={() => {
                                        let noteValue = event.target.textContent
                                        this.setState({ currentNote: null, noteValue: "" });
                                        if (noteValue !== null) {
                                            if (noteValue === "" && index > 0) {
                                                this.props.deleteNote(note.id);
                                            } else {
                                                this.props.updateNote({ ...note, text: noteValue });
                                            }
                                        }
                                    }}
                                    id={this.props.response.id.toString() + "-" + index}
                                />
                            </Col>
                            <Col width={"30px"}>
                                {this.state.currentNote === note.id && note.level > 0 ? <MdFormatIndentDecrease style={{ fontSize: "120%" }} tabIndex={"-1"} onMouseDown={e => e.preventDefault()} onClick={() => this.props.updateNote({ ...note, level: note.level - 1 })} /> : null}
                            </Col>
                            <Col width={"30px"}>
                                {this.state.currentNote === note.id ? <MdFormatIndentIncrease tabIndex={"-1"} style={{ fontSize: "120%" }} onMouseDown={e => e.preventDefault()} onClick={() => this.props.updateNote({ ...note, level: note.level + 1 })} /> : null}
                            </Col>
                        </Row>
                    </form>
                )}
            </div>
        )
    }
}

// const mapStateToProps = (state, ownProps) => ({
//     notes: state.notes.notes[ownProps.response.id] == undefined ? [] : state.notes.notes[ownProps.response.id],
// });


export default connect(null, { getNotes, addNote, updateNote, deleteNote })(BulletEditor)
