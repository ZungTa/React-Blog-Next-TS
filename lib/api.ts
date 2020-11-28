import axios from 'axios';
import queryString from 'query-string';

export const writePost = ({ title, body, tags }: {
    title: string;
    body: string;
    tags: string[];
}) =>
    axios.post('/api/posts', { title, body, tags });

export const getPost = (id: number) =>
    axios.get(`/api/posts/${id}`);

export const getPostList = ({ tag, page }: {
    tag: string;
    page: number;
}) =>
    axios.get(`/api/posts/?${queryString.stringify({ tag, page })}`);

export const editPost = ({ id, title, body, tags }: {
    id: number;
    title: string;
    body: string;
    tags: string[];
}) =>
    axios.patch(`/api/posts/${id}`, { title, body, tags });

export const removePost = (id: number) =>
    axios.delete(`/api/posts/${id}`);

export const login = (password: string) =>
    axios.post('/api/auth/login', { password })

export const checkLogin = () =>
    axios.get('/api/auth/check');

export const logout = () =>
    axios.post('/api/auth/logout');