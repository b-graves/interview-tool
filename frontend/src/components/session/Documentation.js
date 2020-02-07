import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Responses from './Responses';


export class Documentation extends Component {

    render() {
        console.log(this.props.participant)
        return (
            <div>
                <Responses view={this.props.view} completedComponents={this.props.completedComponents} participant={this.props.participant} />
                <div style={{marginTop: "80px"}}>
                    {this.props.suggestions.map(suggestion =>
                        this.props.view === 0 ? null :
                            this.props.view === 1 ?
                                suggestion
                                : null
                    )}
                </div>
            </div>
        )
    }
}


export default connect(null, {})(Documentation)
