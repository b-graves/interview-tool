import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';

export class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = { editorHtml: '<p style="font-family: serif;"><ul><li><br></li></ul></p>' }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(html) {
        console.log(html)
        console.log(html.substring(html.length-8))
        
        this.setState({ editorHtml: html });

    }

    modules = {
        toolbar: [
            [{ 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }]
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    }

    formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]

    render() {
        return (
            <div>
                <ReactQuill
                    theme={"snow"}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={this.modules}
                    formats={this.formats}
                    bounds={'.app'}
                    placeholder={this.props.placeholder}
                />
            </div>
        )
    }
}

export default connect(null, {})(Editor)
