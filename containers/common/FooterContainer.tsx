import React, { Component } from 'react';
import Footer from 'components/common/Footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import { StateType } from 'store/modules/base';


type FooterContainerPropsType = {
    BaseActions: typeof baseActions;
    logged: boolean;
};

function FooterContainerF(props: FooterContainerPropsType) {
    const handleLoginClick = async () => {
        const { BaseActions, logged } = props;
        if (logged) {
            try {
                await BaseActions.logout();
                window.location.reload(); // 페이지 새로고침
            } catch (e) {
                console.warn(e);
            }
            return;
        }

        BaseActions.showModal('login');
        BaseActions.initializeLoginModal();
    };

    return <Footer onLoginClick={handleLoginClick} logged={props.logged} />;
}

class FooterContainer extends Component<FooterContainerPropsType> {
    handleLoginClick = async () => {
        const { BaseActions, logged } = this.props;
        if (logged) {
            try {
                await BaseActions.logout();
                window.location.reload(); // 페이지 새로고침
            } catch (e) {
                console.warn(e);
            }
            return;
        }

        BaseActions.showModal('login');
        BaseActions.initializeLoginModal();
    };

    render() {
        const { handleLoginClick } = this;
        const { logged } = this.props;
        return <Footer onLoginClick={handleLoginClick} logged={logged} />;
    }
}

export default connect(
    (state: StateType) => ({
        // logged: state.base.get('logged'),
        logged: state.get('logged'),
    }),
    dispatch => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
    })
)(FooterContainerF);
