import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getResponses, updateResponse, deleteResponse } from '../../actions/responses';
import { getNotes } from '../../actions/notes';
import { getPlan } from '../../actions/plans';

import { Col, Row } from 'react-onsenui';

import BulletEditor from './BulletEditor'

import { FaTrash } from 'react-icons/fa'

import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


export class Responses extends Component {
    componentDidMount() {
        this.props.getResponses(this.props.participant.id);
        this.props.getNotes(this.props.participant.id);
        this.props.getPlan(this.props.participant.plan);
    }

    getLinkNote(linkNote) {
        return this.props.notes.find(note => note.id === linkNote)
    }

    render() {
        this.props.responses.sort(function (a, b) {
            return a.moment - b.moment;
        })

        let responses = this.props.responses.filter(response => response.participant === this.props.participant.id)
        let notes = this.props.notes.filter(note => note.participant === this.props.participant.id)
        return (
            <div>
                {responses.map(response =>
                    !response.linked ?
                        <Element name={response.component}>
                            {this.props.view === 0 ?
                                <div>
                                    <Row>
                                        {this.props.completedComponents[response.component]}
                                    </Row>
                                    <Row style={{ marginBottom: "20px" }}>
                                        <Col>
                                            <BulletEditor inSession={true} participant={this.props.participant} components={this.props.components} componentItems={this.props.completedComponents} notes={notes.filter(note => note.response === response.id)} updateResponse={this.props.updateResponse} getTime={this.props.getTime} response={response} responses={responses} />
                                        </Col>
                                        <FaTrash
                                            className="icon--center"
                                            onClick={() => {
                                                this.props.deleteResponse(response.id);
                                            }}
                                        />
                                    </Row>
                                </div>
                                :
                                <Row style={{ marginBottom: "20px" }}>
                                    <Col width={"33%"}>
                                        {this.props.completedComponents[response.component]}
                                    </Col>
                                    <Col width={"62%"}>
                                        <BulletEditor inSession={true} participant={this.props.participant} components={this.props.components} componentItems={this.props.completedComponents} notes={notes.filter(note => note.response === response.id)} updateResponse={this.props.updateResponse} getTime={this.props.getTime} response={response} responses={responses} />
                                    </Col>

                                    <FaTrash
                                        className="icon--center"
                                        onClick={() => {
                                            this.props.deleteResponse(response.id);
                                        }}
                                    />
                                </Row>}
                        </Element>
                        : null
                )}
                {responses.map(response =>
                    response.linked ?
                        <Element name={response.component} style={{ opacity: 0.5 }} onClick={() => this.props.updateResponse({ ...response, linked: false, moment: this.props.getTime() })}>
                            {this.props.view === 0 ?
                                <div>
                                    <Row>
                                        {this.props.completedComponents[response.component]}
                                    </Row>
                                    <Row style={{ marginBottom: "20px" }}>
                                        <Col>
                                            <BulletEditor linked={true} scrollTo={this.props.scrollTo} inSession={true} participant={this.props.participant} components={this.props.components} componentItems={this.props.completedComponents} notes={notes.filter(note => note.response === response.id)} updateResponse={this.props.updateResponse} getTime={this.props.getTime} response={response} linkNote={this.getLinkNote(response.link_note)} responses={responses} />
                                        </Col>
                                        <FaTrash
                                            className="icon--center"
                                            onClick={() => {
                                                this.props.deleteResponse(response.id);
                                            }}
                                        />
                                    </Row>
                                </div>
                                :
                                <Row style={{ marginBottom: "20px" }}>
                                    <Col width={"33%"}>
                                        {this.props.completedComponents[response.component]}
                                    </Col>
                                    <Col width={"62%"}>
                                        <BulletEditor linked={true} scrollTo={this.props.scrollTo} inSession={true} participant={this.props.participant} components={this.props.components} componentItems={this.props.completedComponents} notes={notes.filter(note => note.response === response.id)} updateResponse={this.props.updateResponse} getTime={this.props.getTime} response={response} responses={responses} linkNote={this.getLinkNote(response.link_note)} />
                                    </Col>

                                    <FaTrash
                                        className="icon--center"
                                        onClick={() => {
                                            this.props.deleteResponse(response.id);
                                        }}
                                    />
                                </Row>}
                        </Element>
                        : null
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    responses: state.responses.responses,
    components: state.components.components,
    plan: state.plans.plan,
    notes: state.notes.notes
});

export default connect(mapStateToProps, { getResponses, updateResponse, deleteResponse, getPlan, getNotes })(Responses)
