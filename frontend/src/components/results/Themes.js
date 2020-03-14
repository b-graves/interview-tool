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

import Help from "../Help";

export class Codings extends Component {
    componentDidMount() {
        this.props.getCodings();
        this.props.getThemes(this.props.planId);
        this.props.getCodingTypes(this.props.planId);
        let intervalId = setInterval(function () {
            let classes = ["hqbuHK", "hctKJM"]
            classes.forEach(classToChange => {
                let elements = document.getElementsByClassName(classToChange)
                for (let element of elements) {
                    element.innerHTML = element.innerHTML.replace('lane', 'theme').replace('Lane', 'Theme');
                }
            });
        }, 1000);
        this.setState({ intervalId: intervalId })
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId)
      }

    state = {
        show: false,
        name: ""
    }

    handleDragEnd(cardId, sourceLaneId, targetLaneId, position, cardDetails) {
        let theme = targetLaneId;
        if (targetLaneId === 'unsorted-codings') {
            theme = null
        }
        console.log(theme)
        let coding = this.props.codingTypes.find(coding => cardId === coding.id);
        console.log(coding)
        if (coding !== undefined) {
            console.log(coding)
            this.props.updateCodingType({...coding, theme})
        }
    }

    onLaneAdd(params) {
        this.props.addTheme({name: params.title, plan: this.props.planId})
    }

    onLaneDelete(laneId) {
        console.log(laneId)
        this.props.codingTypes.forEach(codingType => {
            if (codingType.theme === laneId) {
                this.props.updateCodingType({...codingType, theme: null});
            }
        })
        this.props.deleteTheme(laneId)
    }

    countCodings(codingTypeId) {
        return this.props.codings.filter(coding => coding.codingtype === codingTypeId).length
    }

    colors = ["#a4167c73", "#0f5eaa9e", "#00990182", "#f8971d8a", "#e7081f8f", "#1ea1e88c"]

    render() {

        let data = {
            lanes: [
                {
                    id: 'unsorted-codings',
                    title: 'Unsorted',
                    style:{backgroundColor: "#00000008"},
                    cards: []
                }
            ]
        }


        this.props.themes.forEach((theme, index) => {
            data["lanes"].push({
                id: theme.id,
                title: theme.name,
                style:{backgroundColor: this.colors[index % this.colors.length]},
                cards: []
            })
        });

        this.props.codingTypes.forEach(codingType => {
            console.log(codingType)
            if (codingType.theme !== null) {
                data.lanes.forEach((lane, index) => {
                    console.log(lane.id === codingType.theme)
                    console.log(lane)
                    console.log(codingType)
                    if (lane.id === codingType.theme) {
                        data.lanes[index].cards.push({
                            id: codingType.id,
                            title: codingType.name
                        })
                    }
                });
            } else {
                data.lanes[0].cards.push({
                    id: codingType.id,
                    title: codingType.name
                })
            }
        });

        if (data["lanes"][0].cards.length == 0) {
            data["lanes"].shift()
        }

        return (
            <div>
                <div style={{paddingBottom: "15px"}}><FaSearch /> Thematic Analysis</div>
                <Help text={"The second step of thematic analysis is generating themes, we look over the codes we’ve created, identify patterns among them, and start coming up with themes. Themes are generally broader than codes. Most of the time, you’ll combine several codes into a single theme. Below you can add themes then click drag codes into them."}/>
                <Board
                    data={data}
                    draggable={true}
                    laneDraggable={false}
                    editable={true}
                    canAddLanes={true}
                    canAddCards={false}
                    hideCardDeleteIcon={true}
                    editLaneTitle={true}
                    handleDragEnd={this.handleDragEnd.bind(this)}
                    onLaneAdd={this.onLaneAdd.bind(this)}
                    onLaneDelete={this.onLaneDelete.bind(this)}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    codings: state.codings.codings,
    themes: state.themes.themes,
    codingTypes: state.codingTypes.codingTypes
});

export default connect(mapStateToProps, { getCodings, getCodingTypes, addCoding, getThemes, addTheme, deleteTheme, deleteCoding, deleteTheme, updateCodingType })(Codings)
