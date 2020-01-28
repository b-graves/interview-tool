import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponents, deleteComponent } from '../../actions/components'


import { Col, Row, Card } from 'react-onsenui';

import { FaCheck } from 'react-icons/fa';

export class TickboxesView extends Component {

    render() {
        let columns = []
        for (let i = 0; i<this.props.columns; i++) {
            columns.push([])
        }

        this.props.components.forEach((component, index) => {
            columns[index%this.props.columns].push(component)
        });

        console.log(columns)

        return (
            <Row>
                {columns.map(column => 
                    <Col>
                        {column.map(component => 
                                <Card 
                                    onClick={() => this.props.toggleCompletion(component.id)}
                                    className={this.props.componentCompletion[component.id] ? 'card--completed' : ''}
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
