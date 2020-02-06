import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import  Editor from './NotesEditor';


export class Documentation extends Component {

    render() {
        
        return (
            <Editor />
        )
    }
}


export default connect(null, {})(Documentation)
