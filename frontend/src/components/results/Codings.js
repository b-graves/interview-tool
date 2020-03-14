import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCodings, addCoding, updateCoding, deleteCoding } from '../../actions/codings';
import { getCodingTypes, addCodingType, updateCodingType, deleteCodingType } from '../../actions/codingtypes';

import { FaSearch } from 'react-icons/fa'

import { Col, Row, Card, Button, Segment, Input } from 'react-onsenui';

import Content from '../layout/Content'

import Help from "../Help";

export class Codings extends Component {
    componentDidMount() {
        this.props.getCodings();
        this.props.getCodingTypes(this.props.planId);
    }

    state = {
        show: false,
        name: ""
    }

    onChange = e => this.setState({ name: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { name } = this.state;
        const codingType = { name, plan: this.props.planId };
        this.props.addCodingType(codingType);
        this.setState({
            name: ""
        });
    }

    enableCoding = codingtype => {
        let coding = {
            codingtype,
            response: this.props.response.id
        }
        this.props.addCoding(coding);
    }

    disableCoding = (codingtype, enabledCodings) => {
        let coding = enabledCodings.find(coding => coding.codingtype === codingtype)
        if (coding) {
            this.props.deleteCoding(coding.id);
        }
    }

    render() {

        let enabledCodings = this.props.codings.filter(coding => coding.response === this.props.response.id)

        let enabledCodingTypes = enabledCodings.map(coding => coding.codingtype)

        return (
            <Content>
                {this.state.show ?
                    <div>
                        <Button modifier="quiet" className="quiet-grey" onClick={() => this.setState({ show: false })}><FaSearch /> Thematic Analysis Coding</Button>
                        <Help text={"Thematic analysis helps you to systematically process qualitative data. The first step is coding. Coding means coming up with shorthand labels or “codes” to describe the content of sections of data. For each response you can add and enable codings, to help you identify recurring themes in the data."}/>
                        <div style={{paddingTop: "10px"}}>
                            {this.props.codingTypes.map(codingType =>
                                enabledCodingTypes.includes(codingType.id) ?
                                    <div className="coding coding--enabled" onClick={() => this.disableCoding(codingType.id, enabledCodings)}>
                                        {codingType.name}
                                    </div>
                                    :
                                    <div className="coding coding--disabled" onClick={() => this.enableCoding(codingType.id)}>
                                        {codingType.name}
                                    </div>
                            )}
                        </div>
                        <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
                            <Input
                                type="text"
                                name="coding"
                                className="coding-input"
                                placeholder="Add Coding"
                                onChange={this.onChange}
                                value={this.state.name}
                            />
                        </form>
                    </div>
                    :
                    <Button modifier="quiet" className="quiet-grey" onClick={() => this.setState({ show: true })}><FaSearch /> Thematic Analysis Coding</Button>
                }
            </Content>
        )
    }
}

const mapStateToProps = state => ({
    codings: state.codings.codings,
    codingTypes: state.codingTypes.codingTypes
});

export default connect(mapStateToProps, { getCodings, addCoding, getCodingTypes, addCodingType, deleteCoding, deleteCodingType })(Codings)
