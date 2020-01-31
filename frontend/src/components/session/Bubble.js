import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent } from '../../actions/components'



import { Col, Row, List, ListItem, Button, Icon } from 'react-onsenui';

import { FaCheck } from 'react-icons/fa';

import BubbleChart from '@weknow/react-bubble-chart-d3';

export class BubbleView extends Component {
    bubbleClick = (label) =>{
        console.log(label)
    }

    colors = ["#949494", "#e6001f", "#f8981d", "#090", "#1ea2e7", "#0e5eaa", "#a5007d"]

    render() {
        
        return (
            <div id="square" style={{
                width: this.props.width ? this.props.width : "100%",
                "padding-bottom": this.props.width ? this.props.width : "100%",
                "margin-top": this.props.shiftDown ? this.props.shiftDown : "0px",
                "margin-left": this.props.shiftRight ? this.props.shiftRight : "0px",
                opacity : this.props.popped ? 0.1 : 1
                }} >
                <img src="/static/frontend/images/bubble.png" id="circle" />
                <div id="circle" className="bubble-center" onClick={() => this.props.onClick()}>
                    <p style={{fontSize: this.props.size, textAlign: "center", fontWeight: "light !important", color: this.colors[this.props.component.color]}} >
                        {this.props.component.name}
                    </p>
                </div>
            </div>



            // <div
            // className="tappable bubble-center" 
            // style={{
            //     width: this.props.radius*2,
            //     height: this.props.radius*2,
            //     "border-radius": this.props.radius,
            //     "background-color": "blue",
            //     color: "white",
            //     "font-size": this.props.radius/5
            // }}>
            //     <p>
            //         {this.props.component.name}
            //     </p>
            // </div>
        )
    }
}


export default connect(null, {})(BubbleView)
