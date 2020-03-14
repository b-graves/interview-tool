import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes, { element } from 'prop-types';

import { getCodings, addCoding, updateCoding, deleteCoding } from '../../actions/codings';
import { getThemes, addTheme, updateTheme, deleteTheme } from '../../actions/themes';
import { getCodingTypes, addCodingType, updateCodingType, deleteCodingType } from '../../actions/codingtypes';

import { FaSearch } from 'react-icons/fa'

import { Col, Row, Card, Button, Segment, Input } from 'react-onsenui';

import Board from 'react-trello';

import Content from '../layout/Content'

import ReactWordcloud from 'react-wordcloud';


export class ThemeResults extends Component {
    componentDidMount() {
        this.props.getCodings();
        this.props.getThemes(this.props.planId);
        this.props.getCodingTypes(this.props.planId);
    }

    state = {
        show: false,
        name: ""
    }

    countCodings(codingTypeId) {
        return this.props.codings.filter(coding => coding.codingtype === codingTypeId).length
    }

    render() {
        let themes = []
        let wordcloudData = []
        this.props.themes.forEach(theme => {
            let themeData = {
                ...theme,
                count: 0,
                codingTypes: []
            }
            this.props.codingTypes.forEach(codingType => {
                if (codingType.theme === theme.id) {
                    let count = this.countCodings(codingType.id);
                    themeData.count += count
                    if (count > 0) {
                        wordcloudData.push({
                            text: codingType.name,
                            value: count
                        })
                    }
                }
            });
            themes.push(themeData);
            if (themeData.count > 0) {
                wordcloudData.push({
                    text: themeData.name,
                    value: themeData.count
                })
            }
        });

        themes.sort(function (a, b) {
            return b.count - a.count;
        })

        return <div>
            <div className="theme-header">Word Cloud</div>
            {this.state.show ? <div style={{ height: '80vh', width: '100%' }}>
                <ReactWordcloud
                    options={{
                        fontFamily: 'Helvetica Neue',
                        fontSizes: [16, 70],
                        fontWeight: 'bold',
                        rotations: 1,
                        rotationAngles: [0, 0]
                    }}
                    words={wordcloudData}
                />
            </div>: <Button onClick={() => this.setState({show: true})}>Generate Word Cloud</Button>}
        </div>

    }
}

const mapStateToProps = state => ({
    codings: state.codings.codings,
    themes: state.themes.themes,
    codingTypes: state.codingTypes.codingTypes
});

export default connect(mapStateToProps, { getCodings, getCodingTypes, addCoding, getThemes, addTheme, deleteTheme, deleteCoding, deleteTheme, updateCodingType })(ThemeResults)
