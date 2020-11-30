import React, { Component } from 'react';
import { connect } from 'react-redux';
import PreviewPane from 'components/editor/PreviewPane';

function PreviewPaneContainerF(props) {
    return (
        <PreviewPane title={props.title} markdown={props.markdown} />
    );
}

class PreviewPaneContainer extends Component {
    render() {
        const { markdown, title } = this.props;

        return (
            <PreviewPane title={title} markdown={markdown} />
        );
    }
}

export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown')
    })
)(PreviewPaneContainerF);