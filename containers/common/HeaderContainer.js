import React, { Component } from 'react';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

function HeaderContainerF(props) {
    const handleRemove = () => {
        this.props.BaseActions.showModal('remove');
    };

    return <Header postId={props.match.params.id} logged={props.logged} onRemove={handleRemove} />;
}

class HeaderContainer extends Component {
    handleRemove = () => {
        this.props.BaseActions.showModal('remove');
    };

    render() {
        const { handleRemove } = this;
        const { match, logged } = this.props;

        const { id } = match.params;

        return <Header postId={id} logged={logged} onRemove={handleRemove} />;
    }
}

export default connect(
    (state) => ({
        logged: state.base.get('logged'),
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
    })
)(withRouter(HeaderContainerF));
