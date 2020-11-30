import React, { Component, useEffect } from 'react';
import LoginModalContainer from 'containers/modal/LoginModalContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from '@store/modules/base';

type BasePropsType = {
    BaseActions: {
        tempLogin: () => void;
        checkLogin: () => void;
    }
}
function BaseF(props: BasePropsType) {
    const initialize = async () => {
        const { BaseActions } = props;
        if (localStorage.logged === 'true') {
            BaseActions.tempLogin();
        }
        BaseActions.checkLogin();
    };

    useEffect(() => {
        // DidMount
        initialize();
    }, []);

    return (
        <div>
            <LoginModalContainer />
            {/* 전역적으로 사용하는 컴포넌트들이 있다면
                여기에서 렌더링 한다. */}
        </div>
    );
}

class Base extends Component<BasePropsType> {
    initialize = async () => {
        const { BaseActions } = this.props;
        if (localStorage.logged === 'true') {
            BaseActions.tempLogin();
        }
        BaseActions.checkLogin();
    };

    componentDidMount() {
        this.initialize();
    }

    render() {
        return (
            <div>
                <LoginModalContainer />
                {/* 전역적으로 사용하는 컴포넌트들이 있다면
                    여기에서 렌더링 한다. */}
            </div>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
    })
)(BaseF);
