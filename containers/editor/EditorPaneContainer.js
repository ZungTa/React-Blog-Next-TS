import React, { Component } from 'react';
import EditorPane from 'components/editor/EditorPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as editorActions from 'store/modules/editor';

function EditorPaneContainerF(props) {
    const handleChangeInput = ({ name, value }) => {
        const { EditorActions } = props;
        EditorActions.changeInput({ name, value });
    }

    return (
        <EditorPane
            title={props.title}
            markdown={props.markdown}
            tags={props.tags}
            onChangeInput={handleChangeInput}
        />
    );
}

class EditorPaneContainer extends Component {

    handleChangeInput = ({ name, value }) => {
        const { EditorActions } = this.props;
        EditorActions.changeInput({ name, value });
    }

    render() {
        const { title, tags, markdown } = this.props;
        const { handleChangeInput } = this;

        return (
            <EditorPane
                title={title}
                markdown={markdown}
                tags={tags}
                onChangeInput={handleChangeInput}
            />
        );
    }
}

export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        tags: state.editor.get('tags')
    }),
    (dispatch) => ({
        EditorActions: bindActionCreators(editorActions, dispatch)
    })
)(EditorPaneContainerF);