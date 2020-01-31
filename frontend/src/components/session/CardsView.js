import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent } from '../../actions/components'


import { Col, Row, Card } from 'react-onsenui';

import { FaCheck } from 'react-icons/fa';

export class TickboxesView extends Component {

    backgroundColors = ["#fff", "#e6001f", "#f8981d", "#090", "#1ea2e7", "#0e5eaa", "#a5007d"]
    colors = ["#000", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]

    render() {
        let columns = []
        let colorColumns = [[], [], [], [], [], [], []]
        let colorIndex = [0, 0, 0, 0, 0, 0, 0]
        if (!this.props.orderByColor){
            for (let i = 0; i<this.props.columns; i++) {
                columns.push([])
            }

            this.props.components.forEach((component, index) => {
                columns[index%this.props.columns].push(component)
            });
        } else {
            for (let i = 0; i<this.colors.length; i++) {
                for (let j = 0; j<this.props.columns; j++) {
                    colorColumns[i].push([])
                }
            }
            this.props.components.forEach((component, index) => {
                colorColumns[component.color][colorIndex[component.color]].push(component);
                colorIndex[component.color] = (colorIndex[component.color] + 1) % this.props.columns;
            });

        }

        return (
        !this.props.orderByColor ? 
            <Row>
                {columns.map(column => 
                    <Col>
                        {column.map(component => 
                                <Card
                                    style={{backgroundColor: this.backgroundColors[component.color], color: this.colors[component.color]}}
                                    onClick={() => this.props.toggleCompletion(component.id)}
                                    className={this.props.componentCompletion[component.id] ? 'card--completed card__uniform' : 'card__uniform'}
                                >
                                    <div className="title">
                                        {component.name}
                                    </div>
                                </Card>
                        )}
                    </Col>
                )}
            </Row>
            : 
                <div>
                    {colorColumns.map(color =>
                        <Row>
                            {color.map(column => 
                    <Col>
                        {column.map(component => 
                                <Card
                                    style={{backgroundColor: this.backgroundColors[component.color], color: this.colors[component.color]}}
                                    onClick={() => this.props.toggleCompletion(component.id)}
                                    className={this.props.componentCompletion[component.id] ? 'card--completed card__uniform' : 'card__uniform'}
                                >
                                    <div className="title">
                                        {component.name}
                                    </div>
                                </Card>
                        )}
                    </Col>
                )}
                        </Row>
                        )}
                </div>
            
        )
        
    }
}


export default connect(null, {})(TickboxesView)
