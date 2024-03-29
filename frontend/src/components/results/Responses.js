import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getResponses, updateResponse, deleteResponse } from '../../actions/responses';
import { getPlan } from '../../actions/plans';

import { getDeclarations, addDeclaration, updateDeclaration, deleteDeclaration } from '../../actions/declarations';

import { getReflections, addReflection, updateReflection, deleteReflection } from '../../actions/reflections';

import { getNotes } from '../../actions/notes';

import { Col, Row, Card, Button, Segment } from 'react-onsenui';

import BulletEditor from '../session/BulletEditor'

import { FaTrash, FaBalanceScale } from 'react-icons/fa'

import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Codings from './Codings';

import Help from '../Help';


export class Responses extends Component {
    componentDidMount() {
        this.props.getResponses(this.props.participant.id);
        this.props.getPlan(this.props.participant.plan);
        this.props.getNotes(this.props.participant.id);
        this.props.getDeclarations(this.props.participant.id);
        this.props.getReflections(this.props.participant.id);
    }

    state = {
        showBias: false
    }

    render() {
        this.props.responses.sort(function (a, b) {
            return a.id - b.id;
        })

        let responses = this.props.responses.filter(response => response.participant === this.props.participant.id)
        let notes = this.props.notes.filter(note => note.participant === this.props.participant.id)

        let declarations = {};
        this.props.declarations.forEach(declaration => declarations[declaration.component] = declaration)

        let reflections = {};
        this.props.reflections.forEach(reflection => reflections[reflection.component] = reflection)

        return (
            <div>
                {responses.map(response =>
                    <Element name={response.id}>
                        {this.props.view === 0 ?
                            <div>
                                <Row>
                                    {this.props.completedComponents[response.component]}
                                </Row>
                                <Row style={{ marginBottom: "20px" }}>
                                    <Col>
                                        <BulletEditor linked={response.linked} components={this.props.components} inSession={false} notes={notes.filter(note => note.response === response.id)} updateResponse={this.props.updateResponse} getTime={() => -1} response={response} />
                                        <Codings response={response} planId={this.props.plan.id} />
                                    </Col>
                                    {this.props.plan.biasReflection && declarations[response.component] ?
                                        this.state.showBias ?
                                            <Col width="30%">
                                                <Card style={{ position: "relative" }}>
                                                    <FaBalanceScale /> Expectations <Help text="This gives you the opportunity to reflect on how the response compared to your expectations. This can be useful in identifying shifts in your point of view and mitigating bias" />
                                                    <Button style={{ position: "absolute", "top": 0, "right": "10px" }} modifier={"quiet"} className="quiet-grey" onClick={() => this.setState({ showBias: false })}>Hide</Button>
                                                    <div>
                                                        <div className="reflection-header">How did you expect the interviewee to respond?</div>
                                                        <div className="textarea textarea--transparent note-input">
                                                            {declarations[response.component] ? declarations[response.component].text : "No expectations declared"}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {reflections[response.component] ?
                                                            <div>
                                                                <div className="reflection-header">Did the response confirm your expectations?</div>
                                                                <Segment style={{ width: "100%" }} modifier="material" index={reflections[response.component].confirmed_expectations !== null ? reflections[response.component].confirmed_expectations : -1} onPostChange={e => this.props.updateReflection({ ...reflections[response.component], confirmed_expectations: e.activeIndex })}>
                                                                    <button>No</button>
                                                                    <button>Partly</button>
                                                                    <button>Yes</button>
                                                                </Segment>
                                                                <div className="reflection-header">In what way?</div>
                                                                <textarea
                                                                    className="textarea textarea--transparent note-input reflection-input"
                                                                    rows="6"
                                                                    placeholder="Type your thoughts here..."

                                                                    onBlur={event => {
                                                                        this.props.updateReflection({ ...reflections[response.component], text: event.target.value });
                                                                    }}
                                                                >
                                                                    {reflections[response.component].text}
                                                                </textarea>
                                                            </div>
                                                            :
                                                            <Button modifier={"quiet"} className="quiet-grey" onClick={() => this.props.addReflection({ participant: this.props.participant.id, component: response.component })}>Add reflection</Button>
                                                        }
                                                    </div>
                                                </Card>
                                            </Col>
                                            :
                                            <Button modifier={"quiet"} className="quiet-grey" onClick={() => this.setState({ showBias: true })}><FaBalanceScale /> Expectations</Button>
                                        :
                                        null
                                    }
                                </Row>
                            </div>
                            :
                            <Row style={{ marginBottom: "20px" }}>
                                <Col width={"30%"}>
                                    {this.props.completedComponents[response.component]}
                                </Col>
                                <Col>
                                    <BulletEditor linked={response.linked} components={this.props.components} inSession={false} notes={notes.filter(note => note.response === response.id)} updateResponse={this.props.updateResponse} getTime={() => -1} response={response} />
                                    <Codings response={response} planId={this.props.plan.id} />
                                </Col>
                                {this.props.plan.biasReflection && declarations[response.component] ?
                                    this.state.showBias ?
                                        <Col width="30%">
                                            <Card style={{ position: "relative" }}>
                                                <FaBalanceScale /> Expectations <Help text="This gives you the opportunity to reflect on how the response compared to your expectations. This can be useful in identifying shifts in your point of view and mitigating bias" />
                                                <Button style={{ position: "absolute", "top": 0, "right": "10px" }} modifier={"quiet"} className="quiet-grey" onClick={() => this.setState({ showBias: false })}>Hide</Button>
                                                <div>
                                                    <div className="reflection-header">How did you expect the interviewee to respond?</div>
                                                    <div className="textarea textarea--transparent note-input">
                                                        {declarations[response.component] ? declarations[response.component].text : "No expectations declared"}
                                                    </div>
                                                </div>
                                                <div>
                                                    {reflections[response.component] ?
                                                        <div>
                                                            <div className="reflection-header">Did the response confirm your expectations?</div>
                                                            <Segment style={{ width: "100%" }} modifier="material" index={reflections[response.component].confirmed_expectations !== null ? reflections[response.component].confirmed_expectations : -1} onPostChange={e => this.props.updateReflection({ ...reflections[response.component], confirmed_expectations: e.activeIndex })}>
                                                                <button>No</button>
                                                                <button>Partly</button>
                                                                <button>Yes</button>
                                                            </Segment>
                                                            <div className="reflection-header">In what way?</div>
                                                            <textarea
                                                                className="textarea textarea--transparent note-input reflection-input"
                                                                rows="6"
                                                                placeholder="Type your thoughts here..."

                                                                onBlur={event => {
                                                                    this.props.updateReflection({ ...reflections[response.component], text: event.target.value });
                                                                }}
                                                            >
                                                                {reflections[response.component].text}
                                                            </textarea>
                                                        </div>
                                                        :
                                                        <Button modifier={"quiet"} className="quiet-grey" onClick={() => this.props.addReflection({ participant: this.props.participant.id, component: response.component })}>Add reflection</Button>
                                                    }
                                                </div>
                                            </Card>
                                        </Col>
                                        :
                                        <Button modifier={"quiet"} className="quiet-grey" onClick={() => this.setState({ showBias: true })}><FaBalanceScale /> Expectations</Button>
                                    :
                                    null
                                }
                            </Row>}
                    </Element>

                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    responses: state.responses.responses,
    components: state.components.components,
    plan: state.plans.plan,
    notes: state.notes.notes,
    declarations: state.declarations.declarations,
    reflections: state.reflections.reflections
});

export default connect(mapStateToProps, { getResponses, updateResponse, getDeclarations, deleteResponse, getPlan, getNotes, getReflections, addReflection, updateReflection, deleteReflection })(Responses)
