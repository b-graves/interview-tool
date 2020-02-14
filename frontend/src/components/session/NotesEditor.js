import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Editor as DraftEditor } from '@tinymce/tinymce-react';

export class Editor extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = { editorHtml: props.response.text === '' ? '<ul><li><p><br></p></li></ul>' : props.response.text, showToolbar: true }
    //     this.handleChange = this.handleChange.bind(this)
    // }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         editorState: EditorState.createEmpty(),
    //     };
    // }

    handleEditorChange = (e) => {
        console.log(
          'Content was updated:',
          e.target.getContent()
        );
        let response = this.props.response;
        response.text = e.target.getContent();
        this.props.updateResponse(response);
      }

    handleChange(html) {
        this.setState({ editorHtml: html });
        console.log(html)
        let response = this.props.response
        response.text = html
        this.props.updateResponse(response)
    }

    render() {
        return (
                <DraftEditor
                    initialValue={this.props.response.text === '' ? '<ul><li><br></li></ul>' : this.props.response.text}
                    apiKey="5plt0g5t2jeyrtizd1c038vxe5ypdmrvrps2zqr6bwodcm23"
                    init={{
                        menubar: false,
                        toolbar: false,
                        plugins: [
                            'advlist lists visualblocks paste'
                        ],
                        toolbar:
                            'bullist outdent indent '
                    }}
                    onChange={this.handleEditorChange}
                />
        )
    }
}


export default connect(null, {})(Editor)
