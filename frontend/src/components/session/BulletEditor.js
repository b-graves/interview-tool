import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getNotes, addNote, updateNote, deleteNote } from '../../actions/notes';

import { Col, Row, List, ListItem, Button, Input } from 'react-onsenui';

import { FaCircle } from 'react-icons/fa';

import { MdFormatIndentIncrease, MdFormatIndentDecrease } from 'react-icons/md';
import Bullet from './Bullet';

export class BulletEditor extends Component {

    componentDidMount() {
        if (this.props.inSession){
            this.props.addNote({ response: this.props.response.id, moment: this.props.getTime(), level: 0, order: 0, participant: this.props.response.participant });
            this.setState({ focus: this.props.response.id.toString() + "-0" })
        }
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
                                <Bullet note={note} onEnter={(note, index) => this.onEnter(note, index)} setListState={(state) => this.setState(state)} response={this.props.response} index={index}/>
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
