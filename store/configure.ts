import { createStore, applyMiddleware, compose, combineReducers, PreloadedState } from 'redux';
import penderMiddleware from 'redux-pender';
import * as modules from './modules';

const reducers = combineReducers(modules);
const middlewares = [penderMiddleware()];

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// 개발 모드일 때만 Redux Devtools를 적용합니다.
const isDev = process.env.NODE_ENV === 'development';
const devTools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;

// preloadedState는 추후 서버사이드 렌더링을 했을 때 전달받는 초기 상태입니다.
const configure = (preloadedState: PreloadedState<{}>) => createStore(reducers, preloadedState, composeEnhancers(
    applyMiddleware(...middlewares)
))

export default configure;