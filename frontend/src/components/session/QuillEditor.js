import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';

export class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = { editorHtml: props.response.text === '' ? '<p style="font-family: serif;"><ul><li><br></li></ul></p>' : props.response.text }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(html) {
        this.setState({ editorHtml: html });
        let response = this.props.response
        response.text = html
        this.props.updateResponse(response)
    }

    toolbarId = "toolbar" + this.props.response.id

    modules = {
        toolbar: { container: "#" + this.toolbarId },
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

    state = {
        showToolbar: true
    }


    render() {
        return (
            <div>
                <div style={{
                    display: this.props.showToolbar ? 'block' : 'none'
                }}>
                    <div id={this.toolbarId}>
                        <span className="ql-formats">
                            <button className="ql-list" value="bullet" />
                            <button className="ql-indent" value="-1" />
                            <button className="ql-indent" value="+1" />
                        </span>
                    </div>
                </div>
                <ReactQuill
                    theme={"snow"}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={this.modules}
                    formats={this.formats}
                    bounds={'.app'}
                    placeholder={this.props.placeholder}
                    onFocus={() => {
                        this.setState({ showToolbar: true })
                    }}
                    onBlur={() => {
                        this.setState({ showToolbar: false })
                    }}
                />
            </div>
        )
    }
}


export default connect(null, {})(Editor)
