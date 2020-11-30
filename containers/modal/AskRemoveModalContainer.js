import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as postActions from 'store/modules/post';
import AskRemoveModal from 'components/modal/AskRemoveModal';
import { withRouter } from 'react-router-dom';

function AskRemoveModalContainerF(props) {
    const handleCancel = () => {
        props.BaseActions.hideModal('remove');
    }
    const handleConfirm = async () => {
        // 포스트 삭제 후 모달을 닫고 메인 페이지로 이동
        try {
            await props.PostActions.removePost(props.match.params.id);
            props.BaseActions.hideModal('remove');
            props.history.push('/');
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <AskRemoveModal
            visible={props.visible}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
        />
    );
}

class AskRemoveModalContainer extends Component {
    handleCancel = () => {
        const { BaseActions } = this.props;
        BaseActions.hideModal('remove');
    }
    handleConfirm = async () => {
        const { BaseActions, PostActions, match, history } = this.props;
        const { id } = match.params;

        // 포스트 삭제 후 모달을 닫고 메인 페이지로 이동
        try {
            await PostActions.removePost(id);
            BaseActions.hideModal('remove');
            history.push('/');
        }
        catch (e) {
            console.error(e);
        }
    }

    render() {
        const { visible } = this.props;
        const { handleCancel, handleConfirm } = this;

        return (
            <AskRemoveModal
                visible={visible}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['modal', 'remove'])
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(withRouter(AskRemoveModalContainerF));