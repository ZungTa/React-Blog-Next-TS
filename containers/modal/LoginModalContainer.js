import React, { Component } from 'react';
import LoginModal from 'components/modal/LoginModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

function LoginModalContainerF(props) {
    console.log('LoginModalContainer props? ', props);
    if (props.visible) {
        console.log('visible true');
    }
    const handleLogin = async () => {
        const { BaseActions, password } = props;
        try {
            // 로그인 시도, 성공하면 모달 닫기
            await BaseActions.login(password);
            BaseActions.hideModal('login');
            localStorage.logged = 'true';
        } catch (e) {
            console.warn(e);
        }
    };
    const handleCancel = () => {
        const { BaseActions } = props;
        BaseActions.hideModal('login');
    };
    const handleChange = (e) => {
        const { BaseActions } = props;
        BaseActions.changePasswordInput(e.target.value);
    };
    const handleKeyPress = (e) => {
        // 엔터 키를 누르면 로그인 호출
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const { visible, error, password } = props;

    return (
        <LoginModal
            onLogin={handleLogin}
            onCancel={handleCancel}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            visible={visible}
            error={error}
            password={password}
        />
    );
}

class LoginModalContainer extends Component {
    handleLogin = async () => {
        const { BaseActions, password } = this.props;
        try {
            // 로그인 시도, 성공하면 모달 닫기
            await BaseActions.login(password);
            BaseActions.hideModal('login');
            localStorage.logged = 'true';
        } catch (e) {
            console.warn(e);
        }
    };
    handleCancel = () => {
        const { BaseActions } = this.props;
        BaseActions.hideModal('login');
    };
    handleChange = (e) => {
        const { BaseActions } = this.props;
        BaseActions.changePasswordInput(e.target.value);
    };
    handleKeyPress = (e) => {
        // 엔터 키를 누르면 로그인 호출
        if (e.key === 'Enter') {
            this.handleLogin();
        }
    };

    render() {
        const {
            handleLogin,
            handleCancel,
            handleChange,
            handleKeyPress,
        } = this;
        const { visible, error, password } = this.props;

        return (
            <LoginModal
                onLogin={handleLogin}
                onCancel={handleCancel}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                visible={visible}
                error={error}
                password={password}
            />
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['modal', 'login']), // boolean
        password: state.base.getIn(['loginModal', 'password']),
        error: state.base.getIn(['loginModal', 'error']),
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
    })
)(LoginModalContainerF);
