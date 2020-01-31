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
        for (let i = 0; i<this.props.columns; i++) {
            columns.push([])
        }

        this.props.components.forEach((component, index) => {
            columns[index%this.props.columns].push(component)
        });

        return (
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
        )
    }
}


export default connect(null, {})(TickboxesView)
