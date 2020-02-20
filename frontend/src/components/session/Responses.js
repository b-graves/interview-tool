import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getResponses, updateResponse, deleteResponse } from '../../actions/responses';
import { getPlan } from '../../actions/plans';

import { Col, Row } from 'react-onsenui';

import BulletEditor from './BulletEditor'

import { FaTrash } from 'react-icons/fa'

import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


export class Responses extends Component {
    componentDidMount() {
        this.props.getResponses(this.props.participant.id);
        this.props.getPlan(this.props.participant.plan);
    }

    render() {
        this.props.responses.sort(function (a, b) {
            return a.id - b.id;
        })
        console.log(this.props.suggestions)

        let responses = this.props.responses.filter(response => response.participant === this.props.participant.id)

        return (
            <div>
                {responses.map(response =>
                    <Element name={response.component}>
                        {this.props.view === 0 ?
                            <div>
                                <Row>
                                    {this.props.completedComponents[response.component]}
                                </Row>
                                <Row style={{ marginBottom: "20px" }}>
                                    <Col>
                                        <BulletEditor updateResponse={this.props.updateResponse} getTime={this.props.getTime} response={response} />
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
                                    <BulletEditor updateResponse={this.props.updateResponse} getTime={this.props.getTime} response={response} />
                                </Col>

                                <FaTrash
                                    className="icon--center"
                                    onClick={() => {
                                        this.props.deleteResponse(response.id);
                                    }}
                                />
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
    plan: state.plans.plan
});

export default connect(mapStateToProps, { getResponses, updateResponse, deleteResponse, getPlan })(Responses)
