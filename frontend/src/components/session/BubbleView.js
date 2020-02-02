import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent } from '../../actions/components'



import { Col, Row, List, ListItem, Button, Icon } from 'react-onsenui';

import { FaCheck } from 'react-icons/fa';

import Bubble from './Bubble';
import { Components } from '../plan/Components';

export class BubbleView extends Component {
    bubbleClick = (label) =>{
        console.log(label)
    }

    makeBubbles = (components) => {
        let rows = []
        for (let i = 0; i<(Math.floor(this.props.components.length/10)+1); i++) {
            rows.push(
                <Row>
                    <Col width={"45%"}>
                        {this.props.components.length > i*10 + 0 ? <Bubble component={this.props.components[i*10 + 0]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 0].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 0].id]} size={Math.max(20, Math.round((26 / this.props.components[i*10 + 0].name.length) * 35))} width="80%" shiftRight={"15%"}/> : null}
                    </Col>
                    <Col width={"20%"}>
                        {this.props.components.length > i*10 + 1 ? <Bubble component={this.props.components[i*10 + 1]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 1].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 1].id]} size={Math.max(11, Math.round((26 / this.props.components[i*10 + 1].name.length) * 20))} width="100%"/> : null}
                        {this.props.components.length > i*10 + 3 ? <Bubble component={this.props.components[i*10 + 3]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 3].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 3].id]} size={Math.max(9, Math.round((30 / this.props.components[i*10 + 3].name.length) * 15))} width="80%" shiftRight={"20px"} shiftDown={"15px"} /> : null}
                    </Col>
                    <Col width={"35%"}>
                        {this.props.components.length > i*10 + 2 ? <Bubble component={this.props.components[i*10 + 2]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 2].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 2].id]} size={Math.max(19, Math.round((38 / this.props.components[i*10 + 2].name.length) * 25))}/>: null}
                    </Col>
                </Row>
            )
            rows.push(
                <Row>
                    <Col width={"25%"}>
                        {this.props.components.length > i*10+ 4 ? <Bubble component={this.props.components[i*10 + 4]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 4].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 4].id]} size={Math.max(13, Math.round((28 / this.props.components[i*10 + 4].name.length) * 20))}/> : null}
                        {this.props.components.length > i*10+ 5 ? <Bubble component={this.props.components[i*10 + 5]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 5].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 5].id]} size={Math.max(7, Math.round((38 / this.props.components[i*10 + 5].name.length) * 10))} width="50%" shiftRight={"70px"} shiftDown={"5px"} /> : null}
                    </Col>
                    <Col width={"40%"}>
                        {this.props.components.length > i*10+ 6 ? <Bubble component={this.props.components[i*10 + 6]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 6].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 6].id]} size={Math.max(22, Math.round((47 / this.props.components[i*10 + 6].name.length) * 30))} width="100%"/> : null}
                    </Col>
                    <Col width={"20"}>
                        {this.props.components.length > i*10+ 8 ? <Bubble component={this.props.components[i*10 + 8]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 8].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 8].id]} size={Math.max(11, Math.round((35 / this.props.components[i*10 + 8].name.length) * 15))} width="100%"/> : null}
                        {this.props.components.length > i*10+ 9 ? <Bubble component={this.props.components[i*10 + 9]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 9].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 9].id]} size={Math.max(9, Math.round((42 / this.props.components[i*10 + 9].name.length) * 12))} width="80%" shiftRight={"20px"} shiftDown={"15px"}/> : null}
                    </Col>
                    <Col width={"15"}>
                        {this.props.components.length > i*10+ 7 ? <Bubble component={this.props.components[i*10 + 7]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 7].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 7].id]} size={Math.max(8, Math.round((38 / this.props.components[i*10 + 7].name.length) * 10))} shiftDown={"100px"}/> : null}
                    </Col>
                </Row>
            )

        }
        return rows;
    }

    render() {    
        return (
            <div style={{padding: "1% 2%"}}>
                {this.makeBubbles(this.props.components)}
            </div>

        )
    }
}


export default connect(null, {})(BubbleView)
