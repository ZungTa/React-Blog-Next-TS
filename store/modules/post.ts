import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

// action types
const GET_POST = 'post/GET_POST';
const REMOVE_POST = 'post/REMOVE_POST';

// action creators
export const getPost = createAction(GET_POST, api.getPost);
export const removePost = createAction(REMOVE_POST, api.removePost);

// initial state
const initialState = Map({
    post: Map({})
});

export type StateType = typeof initialState;

// reducer
export default handleActions({
    ...pender({
        type: GET_POST,
        // TODO: 이거 좀 이상..
        onSuccess: (state: any, action): StateType => {
            const { data: post } = action.payload;
            return state.set('post', fromJS(post));
            // return 1;
        }
    }),
    ...pender({
        type: REMOVE_POST,
        onSuccess: (state, action) => {
            console.log('pbw removePost Success!');
        }
    })
}, initialState)