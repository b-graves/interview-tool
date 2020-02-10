import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Responses from './Responses';


export class Documentation extends Component {

    render() {
        return (
            <div>
                <Responses view={this.props.view} completedComponents={this.props.completedComponents} participant={this.props.participant} />
                <div style={{marginTop: "80px"}}>
                    {this.props.suggestions.map(suggestion =>
                        this.props.view === 0 ? suggestion :
                            this.props.view === 1 ?
                                suggestion
                                : suggestion
                    )}
                </div>
            </div>
        )
    }
}


export default connect(null, {})(Documentation)
