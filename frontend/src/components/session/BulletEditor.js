import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getNotes, addNote, updateNote, deleteNote } from '../../actions/notes';

import { Col, Row, List, ListItem, Button, Input, Popover } from 'react-onsenui';
import { addResponse } from '../../actions/responses';

import { FaCircle, FaLink } from 'react-icons/fa';

import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import { MdFormatIndentIncrease, MdFormatIndentDecrease } from 'react-icons/md';
import Bullet from './Bullet';

export class BulletEditor extends Component {

    componentDidMount() {
        if (this.props.inSession) {
            if (this.props.response.linked) {
                this.props.addNote({ response: this.props.response.id, moment: this.props.getTime(), level: 0, order: 0, participant: this.props.response.participant, text: this.props.linkNote.text });
            } else {
                this.props.addNote({ response: this.props.response.id, moment: this.props.getTime(), level: 0, order: 0, participant: this.props.response.participant });
            }
            this.setState({ focus: this.props.response.id.toString() + "-0" })
        }
    }

    scrollTo(componentId) {
        scroller.scrollTo(componentId, {
            duration: 300,
            smooth: true,
            containerId: "documentationContainer",
            offset: -20
          })
    }

    state = {
        level: 0,
        currentNote: null,
        noteValue: null,
        focus: null,
        isLinking: false,
        linkFromComponent: null
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
                if (!this.props.linked) {
                    document.activeElement.blur();
                    inputElement.focus();
                }
            }
        }
    }

    getResponseByComponent(componentId) {
        return this.props.responses.find(response => response.component === componentId);
    }

    createLink(component) {
        let note = this.props.notes.find(note => note.id === this.state.currentNote);
        if (note) {
            let response = this.getResponseByComponent(component.id)
            if (response) {
                this.props.addNote({text: this.state.noteValue, response: response.id, moment: this.props.getTime(), level: 0, order: 100000000, participant: this.props.response.participant});
            } else {
                this.props.addResponse({
                    participant: this.props.participant.id,
                    component: component.id,
                    moment: this.props.getTime(),
                    link_note: note.id,
                    linked: true
                });
            }
        }
        this.setState({isLinking: false})
    }

    openPopOver(note) {
        this.setState({ target: this.btn, linkFromComponent: this.props.response.component, currentNote: note.id })
        this.scrollTo(this.props.response.component); 
        setTimeout(function(){this.setState({ isLinking: true })}.bind(this), 300);
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
                                {this.state.currentNote === note.id ? <Button modifier={"quiet"} ref={(btn) => { this.btn = btn; }} tabIndex={"-1"} className="link-button" onMouseDown={e => {e.preventDefault();this.openPopOver(note)}} onClick={e => this.openPopOver(note)}><FaLink /></Button> : null}
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
                                    <Col onClick={() => this.createLink(component)}>
                                        {this.props.componentItems[component.id]}
                                    </Col>
                                    <Col onClick={() => this.createLink(groups[groupIndex][index + 1 ])}>
                                        {index+1 < groups[groupIndex].length ? this.props.componentItems[groups[groupIndex][index + 1 ].id] : null}
                                    </Col>
                                    <Col onClick={() => this.createLink(groups[groupIndex][index + 2 ])}>
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




export default connect(null, { getNotes, addNote, updateNote, deleteNote, addResponse })(BulletEditor)
