import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

import { reducerStateType } from '@interfaces/index';

// action types
const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const WRITE_POST = 'editor/WRITE_POST';
const GET_POST = 'editor/GET_POST';
const EDIT_POST = 'editor/EDIT_POST';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST, api.writePost);
export const getPost = createAction(GET_POST, api.getPost);
export const editPost = createAction(EDIT_POST, api.editPost);

// initial state
const initialState = Map({
    postId: null,
    title: '',
    markdown: '',
    tags: '',
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action: { payload: { name: string, value: string } }) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: WRITE_POST,
        onSuccess: (state: Map<string, string>, action: { payload: { data: { _id: string } } }) => {
            const { _id } = action.payload.data;
            return state.set('postId', _id);
        }
    }),
    ...pender({
        type: GET_POST,
        onSuccess: (state: Map<string, string>, action: { payload: { data: { title: string; tags: string[]; body: string } } }) => {
            const { title, tags, body } = action.payload.data;
            return state.set('title', title)
                .set('markdown', body)
                .set('tags', tags.join(', '));
        }
    })
}, initialState)