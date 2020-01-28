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
                        {this.props.components.length > i*10 + 0 ? <Bubble component={this.props.components[i*10 + 0]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 0].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 0].id]} size={45} width="80%" shiftRight={"15%"}/> : null}
                    </Col>
                    <Col width={"20%"}>
                        {this.props.components.length > i*10 + 1 ? <Bubble component={this.props.components[i*10 + 1]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 1].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 1].id]} size={20} width="100%"/> : null}
                        {this.props.components.length > i*10 + 3 ? <Bubble component={this.props.components[i*10 + 3]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 3].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 3].id]} size={15} width="80%" shiftRight={"20px"} shiftDown={"15px"} /> : null}
                    </Col>
                    <Col width={"35%"}>
                        {this.props.components.length > i*10 + 2 ? <Bubble component={this.props.components[i*10 + 2]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 2].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 2].id]} size={25}/>: null}
                    </Col>
                </Row>
            )
            rows.push(
                <Row>
                    <Col width={"25%"}>
                        {this.props.components.length > i*10+ 5 ? <Bubble component={this.props.components[i*10 + 5]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 5].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 5].id]} size={25}/> : null}
                    </Col>
                    <Col width={"40%"}>
                        {this.props.components.length > i*10+ 6 ? <Bubble component={this.props.components[i*10 + 6]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 6].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 6].id]} size={40} width="100%"/> : null}
                    </Col>
                    <Col width={"20"}>
                        {this.props.components.length > i*10+ 8 ? <Bubble component={this.props.components[i*10 + 8]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 8].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 8].id]} size={15} width="100%"/> : null}
                        {this.props.components.length > i*10+ 7 ? <Bubble component={this.props.components[i*10 + 7]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 7].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 7].id]} size={15} width="80%" shiftRight={"20px"} shiftDown={"15px"}/> : null}
                    </Col>
                    <Col width={"15"}>
                        {this.props.components.length > i*10+ 9 ? <Bubble component={this.props.components[i*10 + 9]} onClick={() => this.props.toggleCompletion(this.props.components[i*10 + 9].id)} popped={this.props.componentCompletion[this.props.components[i*10 + 9].id]} size={15} shiftDown={"100px"}/> : null}
                    </Col>
                </Row>
            )

        }
        return rows;
    }

    render() {    
        return (
            <div>
                {this.makeBubbles(this.props.components)}
            </div>

        )
    }
}


export default connect(null, {})(BubbleView)
