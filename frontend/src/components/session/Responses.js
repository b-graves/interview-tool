import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getResponses, updateResponse, deleteResponse } from '../../actions/responses';

import { Col, Row } from 'react-onsenui';

import Editor from './NotesEditor'

import { FaTrash } from 'react-icons/fa'


export class Responses extends Component {
    componentDidMount() {
        console.log(this.props.participant)
        this.props.getResponses(this.props.participant.id);

    }

    render() {
        this.props.responses.sort(function (a, b) {
            return a.id - b.id;
        })
        console.log(this.props.suggestions)

        return (
            <div>
                {this.props.responses.map(response =>
                    this.props.view === 0 ?
                        <div>
                            <Row>
                                {this.props.completedComponents[response.component]}
                            </Row>
                            <Row style={{ marginBottom: "20px" }}>
                                <Col>
                                    <Editor updateResponse={this.props.updateResponse} response={response} />
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
                        this.props.view === 1 ?
                            <Row style={{ marginBottom: "20px" }}>
                                <Col width={"33%"}>
                                    {this.props.completedComponents[response.component]}
                                </Col>
                                <Col>
                                    <Editor updateResponse={this.props.updateResponse} response={response} />
                                </Col>

                                <FaTrash
                                    className="icon--center"
                                    onClick={() => {
                                        this.props.deleteResponse(response.id);
                                    }}
                                />
                            </Row>
                            : null
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    responses: state.responses.responses,
    components: state.components.components
});

export default connect(mapStateToProps, { getResponses, updateResponse, deleteResponse })(Responses)
