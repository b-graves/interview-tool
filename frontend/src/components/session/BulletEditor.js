import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getNotes, addNote, updateNote, deleteNote } from '../../actions/notes';

import { Col, Row, List, ListItem, Button, Input, Popover } from 'react-onsenui';

import { FaCircle, FaLink } from 'react-icons/fa';

import { MdFormatIndentIncrease, MdFormatIndentDecrease } from 'react-icons/md';
import Bullet from './Bullet';

export class BulletEditor extends Component {

    componentDidMount() {
        if (this.props.inSession) {
            this.props.addNote({ response: this.props.response.id, moment: this.props.getTime(), level: 0, order: 0, participant: this.props.response.participant });
            this.setState({ focus: this.props.response.id.toString() + "-0" })
        }
    }

    state = {
        level: 0,
        currentNote: null,
        noteValue: null,
        focus: null,
        isLinking: false,
        linkFromComponent: null,
        linkNote: null
    }

    onSubmit = (e, note, index) => {
        e.preventDefault();
        let order = note.order;
        if (index === this.props.notes.length - 1) {
            order += 100
        } else {
            order = (order + this.props.notes[index + 1].order) / 2
        }
        this.props.addNote({ response: this.props.response.id, moment: this.props.getTime(), level: note.level, order, participant: this.props.response.participant });
        this.setState({ focus: this.props.response.id.toString() + "-" + (index + 1) })
    }

    onEnter = (note, index) => {
        let order = note.order;
        if (index === this.props.notes.length - 1) {
            order += 100
        } else {
            order = (order + this.props.notes[index + 1].order) / 2
        }
        this.props.addNote({ response: this.props.response.id, moment: this.props.getTime(), level: note.level, order, participant: this.props.response.participant });
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

    btn = null;

    render() {
        this.props.notes.sort(function (a, b) {
            return a.order - b.order;
        })

        this.props.components.sort(function (a, b) {
            return b.priority - a.priority;
        })

        this.props.components.sort(function (a, b) {
            return a.group - b.group;
        });

        let groups = {}
        let groupIndices = []

        this.props.components.forEach(component => {
            if (component.id !== this.state.linkFromComponent) {
                if (component.group in groups) {
                    groups[component.group].push(component)
                } else {
                    groups[component.group] = [component]
                    groupIndices.push(component.group)
                }
            }
        });

        return (
            <div style={{ padding: "10px" }}>
                {this.props.notes.map((note, index) =>
                    <form onSubmit={e => this.onSubmit(e, note, index)}>
                        <Row>
                            <Col width={20 * note.level + 30} style={{ paddingLeft: 20 * note.level }}>
                                <FaCircle className="bullet-point" />
                            </Col>
                            <Col>
                                <Bullet note={note} onEnter={(note, index) => this.onEnter(note, index)} setListState={(state) => this.setState(state)} response={this.props.response} index={index} />
                            </Col>
                            <Col width={"30px"}>
                                {this.state.currentNote === note.id && note.level > 0 ? <MdFormatIndentDecrease style={{ fontSize: "120%" }} tabIndex={"-1"} onMouseDown={e => e.preventDefault()} onClick={() => this.props.updateNote({ ...note, level: note.level - 1 })} /> : null}
                            </Col>
                            <Col width={"30px"}>
                                {this.state.currentNote === note.id ? <MdFormatIndentIncrease tabIndex={"-1"} style={{ fontSize: "120%" }} onMouseDown={e => e.preventDefault()} onClick={() => this.props.updateNote({ ...note, level: note.level + 1 })} /> : null}
                            </Col>
                            <Col width={"30px"}>
                                {this.state.currentNote === note.id || this.state.linkNote === note.id ? <Button modifier={"quiet"} ref={(btn) => { this.btn = btn; }} tabIndex={"-1"} className="link-button" onMouseDown={e => e.preventDefault()} onClick={() => this.setState({ target: this.btn, isLinking: true, linkFromComponent: this.props.response.component, linkNote: note.id })}><FaLink /></Button> : null}
                            </Col>
                        </Row>
                    </form>
                )}
                <Popover
                    isOpen={this.state.isLinking}
                    onCancel={() => this.setState({ isLinking: false })}
                    getTarget={() => this.state.target}
                    className="link-popover"
                >
                    <div style={{padding: "15px"}}>
                        <div style={{paddingBottom: "10px"}}>Link note to another component...</div>
                        {groupIndices.map(groupIndex => {
                        return groups[groupIndex].map((component, index) => 
                            index % 3 === 0 ?
                                <Row>
                                    <Col>
                                        {this.props.componentItems[component.id]}
                                    </Col>
                                    <Col>
                                        {index+1 < groups[groupIndex].length ? this.props.componentItems[groups[groupIndex][index + 1 ].id] : null}
                                    </Col>
                                    <Col>
                                        {index+2 < groups[groupIndex].length ? this.props.componentItems[groups[groupIndex][index + 2 ].id] : null}
                                    </Col>
                                </Row>
                        : null)})}
                    </div>
                </Popover>
            </div>
        )
    }
}

// const mapStateToProps = (state, ownProps) => ({
//     notes: state.notes.notes[ownProps.response.id] == undefined ? [] : state.notes.notes[ownProps.response.id],
// });


export default connect(null, { getNotes, addNote, updateNote, deleteNote })(BulletEditor)
