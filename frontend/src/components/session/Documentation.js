import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Responses from './Responses';


export class Documentation extends Component {

    render() {
        return (
            <div>
                <Responses scrollTo={this.props.scrollTo} view={this.props.view} getTime={this.props.getTime} completedComponents={this.props.completedComponents} participant={this.props.participant} inSession={true} />
                <div style={{marginTop: "80px", minHeight: "150px"}}>
                    {this.props.suggestions.map(suggestion =>
                        this.props.view === 0 && !this.props.hideSuggestions ? suggestion :
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
