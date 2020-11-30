import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

// action types
const GET_POST_LIST = 'list/GET_POST_LIST';

// action creators
export const getPostList = createAction(GET_POST_LIST, api.getPostList);

// initial state
const initialState = Map({
    posts: List(),
    lastPage: null
});

type StateType = typeof initialState;

// reducer
export default handleActions({
    ...pender({
        type: GET_POST_LIST,
        // onSuccess: (state: Map<string, string | number>, action: { payload: { data: any, headers: any } }) => {
        onSuccess: (state: StateType, action: { payload: { data: any, headers: any } }) => {
            const { data: posts } = action.payload;

            const lastPage = action.payload.headers['last-page'];
            return state.set('posts', fromJS(posts))
                .set('lastPage', parseInt(lastPage, 10));
        }
    })
    // TODO: any는 좀..
}, initialState as any)